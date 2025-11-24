package com.neurotrack.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class WeatherService {

    private final org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();

    public Map<String, Object> getCurrentWeather(String lat, String lon) {
        if (lat == null || lon == null) {
            // Default to Warsaw if no location provided
            lat = "52.2297";
            lon = "21.0122";
        }

        String url = String.format(
                "https://api.open-meteo.com/v1/forecast?latitude=%s&longitude=%s&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m",
                lat, lon);

        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            Map<String, Object> current = (Map<String, Object>) response.get("current");

            Map<String, Object> weather = new HashMap<>();
            weather.put("temp", current.get("temperature_2m"));
            weather.put("condition", getWeatherCondition((Integer) current.get("weather_code")));
            weather.put("humidity", current.get("relative_humidity_2m"));
            weather.put("pressure", current.get("surface_pressure"));
            weather.put("location", String.format("%s, %s", lat.substring(0, 5), lon.substring(0, 5))); // Simple
                                                                                                        // location for
                                                                                                        // now

            return weather;
        } catch (Exception e) {
            e.printStackTrace();
            // Fallback to mock if API fails
            Map<String, Object> fallback = new HashMap<>();
            fallback.put("temp", 0);
            fallback.put("condition", "Error");
            fallback.put("humidity", 0);
            fallback.put("pressure", 0);
            fallback.put("location", "Error");
            return fallback;
        }
    }

    private String getWeatherCondition(Integer code) {
        if (code == null)
            return "Unknown";
        if (code == 0)
            return "Clear";
        if (code <= 3)
            return "Cloudy";
        if (code <= 48)
            return "Foggy";
        if (code <= 67)
            return "Rainy";
        if (code <= 77)
            return "Snowy";
        if (code <= 82)
            return "Rainy";
        if (code <= 86)
            return "Snowy";
        return "Stormy";
    }
}
