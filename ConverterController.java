package com.converterhub.controller;

import com.converterhub.dto.common.ApiResponse;
import com.converterhub.dto.common.PageResponse;
import com.converterhub.dto.converter.ConverterRequest;
import com.converterhub.dto.converter.ConverterResponse;
import com.converterhub.service.ConverterService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/converters")
public class ConverterController {
    private final ConverterService converterService;

    public ConverterController(ConverterService converterService) {
        this.converterService = converterService;
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<PageResponse<ConverterResponse>>> getByCategory(@PathVariable Long categoryId, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("Converters fetched", converterService.getConvertersByCategory(categoryId, pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ConverterResponse>> getConverter(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Converter fetched", converterService.getConverter(id)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ConverterResponse>> createConverter(@Valid @RequestBody ConverterRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Converter created", converterService.createConverter(request)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteConverter(@PathVariable Long id) {
        converterService.deleteConverter(id);
        return ResponseEntity.ok(ApiResponse.success("Converter deleted", null));
    }
}
