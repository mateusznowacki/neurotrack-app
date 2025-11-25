package com.neurotrack.service;

import com.neurotrack.dto.ReportDTO;
import com.neurotrack.model.MigraineEntry;
import com.neurotrack.model.User;
import com.neurotrack.repository.MigraineEntryRepository;
import com.neurotrack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

        private final MigraineEntryRepository migraineRepository;
        private final UserRepository userRepository;

        public ReportDTO getUserReport(String email) {
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                List<MigraineEntry> entries = migraineRepository.findByUserOrderByStartTimeDesc(user);

                ReportDTO report = new ReportDTO();
                report.setTotalMigraines(entries.size());

                if (entries.isEmpty()) {
                        report.setAverageIntensity(0);
                        report.setAverageDurationHours(0);
                        report.setMigrainesByMonth(new HashMap<>());
                        report.setTopTriggers(new HashMap<>());
                        report.setTopSymptoms(new HashMap<>());
                        return report;
                }

                // Average Intensity
                double avgIntensity = entries.stream()
                                .mapToInt(MigraineEntry::getIntensity)
                                .average()
                                .orElse(0.0);
                report.setAverageIntensity(Math.round(avgIntensity * 10.0) / 10.0);

                // Average Duration
                double totalDurationHours = 0;
                int durationCount = 0;
                for (MigraineEntry entry : entries) {
                        if (entry.getEndTime() != null) {
                                Duration duration = Duration.between(entry.getStartTime(), entry.getEndTime());
                                totalDurationHours += duration.toMinutes() / 60.0;
                                durationCount++;
                        }
                }
                double avgDuration = durationCount > 0 ? totalDurationHours / durationCount : 0;
                report.setAverageDurationHours(Math.round(avgDuration * 10.0) / 10.0);

                // Migraines by Month
                Map<String, Long> byMonth = entries.stream()
                                .collect(Collectors.groupingBy(
                                                e -> e.getStartTime().format(DateTimeFormatter.ofPattern("yyyy-MM")),
                                                Collectors.counting()));
                report.setMigrainesByMonth(new TreeMap<>(byMonth)); // Sorted by date

                // Top Triggers
                Map<String, Long> triggers = entries.stream()
                                .flatMap(e -> e.getTriggers().stream())
                                .collect(Collectors.groupingBy(t -> t, Collectors.counting()));
                report.setTopTriggers(getTopN(triggers, 5));

                // Top Symptoms
                Map<String, Long> symptoms = entries.stream()
                                .flatMap(e -> e.getSymptoms().stream())
                                .collect(Collectors.groupingBy(s -> s, Collectors.counting()));
                report.setTopSymptoms(getTopN(symptoms, 5));

                // Intensity Distribution
                Map<Integer, Long> intensityDist = entries.stream()
                                .collect(Collectors.groupingBy(MigraineEntry::getIntensity, Collectors.counting()));
                report.setIntensityDistribution(intensityDist);

                // Migraines by Pressure
                Map<String, Long> pressureMap = new HashMap<>();
                pressureMap.put("<1000 hPa", 0L);
                pressureMap.put("1000-1015 hPa", 0L);
                pressureMap.put(">1015 hPa", 0L);

                for (MigraineEntry entry : entries) {
                        if (entry.getPressure() != null) {
                                int p = entry.getPressure();
                                if (p < 1000) {
                                        pressureMap.put("<1000 hPa", pressureMap.get("<1000 hPa") + 1);
                                } else if (p <= 1015) {
                                        pressureMap.put("1000-1015 hPa", pressureMap.get("1000-1015 hPa") + 1);
                                } else {
                                        pressureMap.put(">1015 hPa", pressureMap.get(">1015 hPa") + 1);
                                }
                        }
                }
                report.setMigrainesByPressure(pressureMap);

                return report;
        }

        public byte[] generateCsvReport(String email) {
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                List<MigraineEntry> entries = migraineRepository.findByUserOrderByStartTimeDesc(user);

                StringBuilder csv = new StringBuilder();
                csv.append("Data,Godzina,Czas trwania (h),Intensywność,Lokalizacja bólu,Objawy,Wyzwalacze,Leki,Ciśnienie (hPa),Temperatura (C)\n");

                DateTimeFormatter dateFmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                DateTimeFormatter timeFmt = DateTimeFormatter.ofPattern("HH:mm");

                for (MigraineEntry e : entries) {
                        double duration = 0;
                        if (e.getEndTime() != null) {
                                duration = Duration.between(e.getStartTime(), e.getEndTime()).toMinutes() / 60.0;
                        }

                        csv.append(e.getStartTime().format(dateFmt)).append(",");
                        csv.append(e.getStartTime().format(timeFmt)).append(",");
                        csv.append(String.format(Locale.US, "%.1f", duration)).append(",");
                        csv.append(e.getIntensity()).append(",");
                        csv.append(escapeCsv(String.join(";", e.getPainLocations()))).append(",");
                        csv.append(escapeCsv(String.join(";", e.getSymptoms()))).append(",");
                        csv.append(escapeCsv(String.join(";", e.getTriggers()))).append(",");
                        csv.append(escapeCsv(String.join(";", e.getMedications()))).append(",");
                        csv.append(e.getPressure() != null ? e.getPressure() : "").append(",");
                        csv.append(e.getTemperature() != null ? e.getTemperature() : "").append("\n");
                }

                return csv.toString().getBytes(java.nio.charset.StandardCharsets.UTF_8);
        }

        private String escapeCsv(String data) {
                if (data == null)
                        return "";
                return "\"" + data.replace("\"", "\"\"") + "\"";
        }

        private Map<String, Long> getTopN(Map<String, Long> map, int n) {
                return map.entrySet().stream()
                                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                                .limit(n)
                                .collect(Collectors.toMap(
                                                Map.Entry::getKey,
                                                Map.Entry::getValue,
                                                (e1, e2) -> e1,
                                                LinkedHashMap::new));
        }
}
