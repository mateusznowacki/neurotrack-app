package com.neurotrack.dto;

import lombok.Data;
import java.util.Map;

@Data
public class ReportDTO {
    private int totalMigraines;
    private double averageIntensity;
    private double averageDurationHours;
    private Map<String, Long> migrainesByMonth;
    private Map<String, Long> topTriggers;
    private Map<String, Long> topSymptoms;
    private Map<Integer, Long> intensityDistribution;
    private Map<String, Long> migrainesByPressure;
}
