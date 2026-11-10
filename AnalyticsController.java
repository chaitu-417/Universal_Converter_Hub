package com.converterhub.controller;

import com.converterhub.dto.common.ApiResponse;
import com.converterhub.entity.Analytics;
import com.converterhub.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/trending")
    public ResponseEntity<ApiResponse<List<Analytics>>> getTrending() {
        return ResponseEntity.ok(ApiResponse.success("Trending fetched", analyticsService.getTop10Trending()));
    }
}
