package com.converterhub.dto.favorite;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FavoriteRequest {
    @NotNull(message = "Converter ID is required")
    private Long converterId;
}
