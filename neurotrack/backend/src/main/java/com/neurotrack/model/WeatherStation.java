package com.neurotrack.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "weather_stations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeatherStation {
    @Id
    private String stationId; // kod_stacji

    private String name; // nazwa_stacji
    private Double latitude; // lat
    private Double longitude; // lon

    private Double temperature; // temperatura_powietrza
    private Double humidity; // wilgotnosc_wzgledna
    private Double pressure; // cisnienie
    private Double windSpeed; // wiatr_srednia_predkosc

    private LocalDateTime lastUpdated;
}
