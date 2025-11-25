package com.neurotrack.controller;

import com.neurotrack.dto.ReportDTO;
import com.neurotrack.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({ "/api/reports", "/reports" })
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/dashboard")
    public ResponseEntity<ReportDTO> getDashboardReport(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(reportService.getUserReport(email));
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportReport(Authentication authentication) {
        String email = authentication.getName();
        byte[] csvData = reportService.generateCsvReport(email);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=raport_migren.csv")
                .header("Content-Type", "text/csv; charset=UTF-8")
                .body(csvData);
    }
}
