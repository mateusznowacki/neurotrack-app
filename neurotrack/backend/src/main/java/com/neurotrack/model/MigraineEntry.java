package com.neurotrack.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "migraine_entries")
public class MigraineEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @Column(nullable = false)
    private Integer intensity;

    @ElementCollection
    private List<String> symptoms;

    @ElementCollection
    private List<String> triggers;

    @ElementCollection
    private List<String> medications;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @ElementCollection
    private List<String> painLocations;

    @ElementCollection
    private List<String> reliefMethods;

    private String weatherInfo;
}
