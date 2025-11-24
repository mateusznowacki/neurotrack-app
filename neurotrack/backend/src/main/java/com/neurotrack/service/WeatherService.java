package com.neurotrack.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class WeatherService {

    public Map<String, Object> getCurrentWeather(String lat, String lon) {
        // Mock implementation
        Map<String, Object> weather = new HashMap<>();
        weather.put("temp", 22.5);
        weather.put("condition", "Rainy");
        weather.put("humidity", 65);
        weather.put("pressure", 1013);
        weather.put("location", "Mock Location");
        return weather;
    }
}
