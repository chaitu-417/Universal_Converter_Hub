package com.converterhub.controller;

import com.converterhub.dto.common.ApiResponse;
import com.converterhub.dto.converter.ConverterResponse;
import com.converterhub.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ConverterResponse>>> search(@RequestParam String q) {
        return ResponseEntity.ok(ApiResponse.success("Search results", searchService.searchConverters(q)));
    }
}
