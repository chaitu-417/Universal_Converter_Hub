package com.converterhub.controller;

import com.converterhub.dto.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<String>> getDashboard() {
        return ResponseEntity.ok(ApiResponse.success("Admin dashboard accessed", "Dashboard Data"));
    }
}
