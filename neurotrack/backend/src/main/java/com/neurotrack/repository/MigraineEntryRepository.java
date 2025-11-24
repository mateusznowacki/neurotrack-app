package com.neurotrack.repository;

import com.neurotrack.model.MigraineEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface MigraineEntryRepository extends JpaRepository<MigraineEntry, UUID> {
    List<MigraineEntry> findByUserIdOrderByStartTimeDesc(UUID userId);
}
