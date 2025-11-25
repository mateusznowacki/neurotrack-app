package com.neurotrack.service;

import com.neurotrack.model.WeatherStation;
import com.neurotrack.repository.WeatherStationRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import jakarta.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class WeatherService {

    private final WeatherStationRepository stationRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String IMGW_API_URL = "https://danepubliczne.imgw.pl/api/data/meteo/";

    @PostConstruct
    public void init() {
        fetchAndSaveStations();
    }

    @Scheduled(fixedRate = 900000) // 15 minutes
    public void fetchAndSaveStations() {
        try {
            System.out.println("Fetching weather stations from IMGW...");
            String response = restTemplate.getForObject(IMGW_API_URL, String.class);
            JsonNode root = objectMapper.readTree(response);

            if (root.isArray()) {
                for (JsonNode node : root) {
                    WeatherStation station = new WeatherStation();
                    station.setStationId(node.path("kod_stacji").asText());
                    station.setName(node.path("nazwa_stacji").asText());
                    station.setLatitude(node.path("lat").asDouble());
                    station.setLongitude(node.path("lon").asDouble());

                    // Parse weather data
                    if (node.has("temperatura_powietrza")) {
                        station.setTemperature(node.path("temperatura_powietrza").asDouble());
                    }
                    if (node.has("wilgotnosc_wzgledna")) {
                        station.setHumidity(node.path("wilgotnosc_wzgledna").asDouble());
                    }
                    if (node.has("cisnienie")) {
                        station.setPressure(node.path("cisnienie").asDouble());
                    } else {
                        // Some stations don't have pressure, default to standard if missing or null
                        station.setPressure(1013.0);
                    }
                    if (node.has("wiatr_srednia_predkosc")) {
                        station.setWindSpeed(node.path("wiatr_srednia_predkosc").asDouble());
                    }

                    station.setLastUpdated(LocalDateTime.now());
                    stationRepository.save(station);
                }
                System.out.println("Successfully updated " + root.size() + " weather stations.");
            }
        } catch (Exception e) {
            System.err.println("Error fetching IMGW data: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public Map<String, Object> getCurrentWeather(String latStr, String lonStr) {
        System.out.println("Received weather request for lat: " + latStr + ", lon: " + lonStr);
        double lat = 52.2297; // Default Warsaw
        double lon = 21.0122;

        if (latStr != null && lonStr != null) {
            try {
                lat = Double.parseDouble(latStr);
                lon = Double.parseDouble(lonStr);
            } catch (NumberFormatException e) {
                // Ignore invalid coords
            }
        }

        List<WeatherStation> stations = stationRepository.findAll();

        if (stations.isEmpty()) {
            // Fallback if DB is empty (shouldn't happen due to PostConstruct)
            return getFallbackWeather();
        }

        // Find nearest station
        final double targetLat = lat;
        final double targetLon = lon;

        System.out.println("Calculating nearest station for: " + targetLat + ", " + targetLon);

        WeatherStation nearest = stations.stream()
                .min(Comparator.comparingDouble(
                        s -> calculateDistance(targetLat, targetLon, s.getLatitude(), s.getLongitude())))
                .orElse(stations.get(0));

        double distance = calculateDistance(targetLat, targetLon, nearest.getLatitude(), nearest.getLongitude());
        System.out.println("Nearest station found: " + nearest.getName() + " (Distance: " + distance + " km)");

        Map<String, Object> weather = new HashMap<>();
        weather.put("temp", nearest.getTemperature());
        weather.put("humidity", nearest.getHumidity());
        weather.put("pressure", nearest.getPressure());
        weather.put("location", nearest.getName());

        // Determine condition based on humidity/temp (IMGW doesn't provide condition
        // code directly in this endpoint)
        // Simple heuristic
        String condition = "Cloudy";
        if (nearest.getHumidity() > 90)
            condition = "Rainy";
        else if (nearest.getHumidity() < 40)
            condition = "Clear";
        else if (nearest.getHumidity() > 95 && nearest.getTemperature() < 0)
            condition = "Snowy";

        weather.put("condition", condition);

        return weather;
    }

    // Haversine formula to calculate distance in km
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of the earth in km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                        * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private Map<String, Object> getFallbackWeather() {
        Map<String, Object> fallback = new HashMap<>();
        fallback.put("temp", 20);
        fallback.put("condition", "Cloudy");
        fallback.put("humidity", 60);
        fallback.put("pressure", 1013);
        fallback.put("location", "Warsaw (Fallback)");
        return fallback;
    }
}
