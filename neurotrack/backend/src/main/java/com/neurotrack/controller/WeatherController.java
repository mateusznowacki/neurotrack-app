package com.neurotrack.controller;

import com.neurotrack.service.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({ "/api/weather", "/weather" })
@RequiredArgsConstructor
public class WeatherController {

    private final WeatherService weatherService;

    @GetMapping(value = "/current", produces = "application/json;charset=UTF-8")
    public ResponseEntity<?> getCurrentWeather(@RequestParam(required = false) String lat,
            @RequestParam(required = false) String lon) {
        return ResponseEntity.ok(weatherService.getCurrentWeather(lat, lon));
    }
}
