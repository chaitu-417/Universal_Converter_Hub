package com.converterhub.controller;

import com.converterhub.dto.common.ApiResponse;
import com.converterhub.dto.common.PageResponse;
import com.converterhub.dto.converter.ConverterResponse;
import com.converterhub.dto.favorite.FavoriteRequest;
import com.converterhub.security.UserPrincipal;
import com.converterhub.service.FavoriteService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {
    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ConverterResponse>>> getUserFavorites(
            @AuthenticationPrincipal UserPrincipal user, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("Favorites fetched", favoriteService.getUserFavorites(user.getId(), pageable)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> addFavorite(
            @AuthenticationPrincipal UserPrincipal user, @Valid @RequestBody FavoriteRequest request) {
        favoriteService.addFavorite(user.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Added to favorites", null));
    }

    @DeleteMapping("/{converterId}")
    public ResponseEntity<ApiResponse<Void>> removeFavorite(
            @AuthenticationPrincipal UserPrincipal user, @PathVariable Long converterId) {
        favoriteService.removeFavorite(user.getId(), converterId);
        return ResponseEntity.ok(ApiResponse.success("Removed from favorites", null));
    }
}
