package com.neurotrack.controller;

import com.neurotrack.model.MigraineEntry;
import com.neurotrack.model.User;
import com.neurotrack.repository.MigraineEntryRepository;
import com.neurotrack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping({ "/api/entries", "/entries" })
@RequiredArgsConstructor
public class MigraineEntryController {

    private final MigraineEntryRepository entryRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<MigraineEntry>> getEntries() {
        User user = getCurrentUser();
        return ResponseEntity.ok(entryRepository.findByUserIdOrderByStartTimeDesc(user.getId()));
    }

    @PostMapping
    public ResponseEntity<MigraineEntry> createEntry(@RequestBody MigraineEntry entry) {
        User user = getCurrentUser();
        entry.setUser(user);
        // Ensure ID is null so it gets generated
        entry.setId(null);
        if (entry.getStartTime() == null) {
            entry.setStartTime(LocalDateTime.now());
        }
        return ResponseEntity.ok(entryRepository.save(entry));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MigraineEntry> getEntry(@PathVariable UUID id) {
        User user = getCurrentUser();
        return entryRepository.findById(id)
                .filter(entry -> entry.getUser().getId().equals(user.getId()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEntry(@PathVariable UUID id) {
        User user = getCurrentUser();
        return entryRepository.findById(id)
                .filter(entry -> entry.getUser().getId().equals(user.getId()))
                .map(entry -> {
                    entryRepository.delete(entry);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }
        String email = (String) auth.getPrincipal();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
    }
}
