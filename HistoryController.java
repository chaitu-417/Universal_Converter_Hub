package com.converterhub.controller;

import com.converterhub.dto.common.ApiResponse;
import com.converterhub.dto.common.PageResponse;
import com.converterhub.dto.history.HistoryRequest;
import com.converterhub.entity.ConversionHistory;
import com.converterhub.security.UserPrincipal;
import com.converterhub.service.HistoryService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/history")
public class HistoryController {
    private final HistoryService historyService;

    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> recordHistory(
            @AuthenticationPrincipal UserPrincipal user, @Valid @RequestBody HistoryRequest request) {
        Long userId = user != null ? user.getId() : null;
        historyService.recordHistory(userId, request);
        return ResponseEntity.ok(ApiResponse.success("History recorded", null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ConversionHistory>>> getHistory(
            @AuthenticationPrincipal UserPrincipal user, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("History fetched", historyService.getUserHistory(user.getId(), pageable)));
    }
}
