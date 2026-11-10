package com.converterhub.dto.history;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class HistoryRequest {
    @NotNull(message = "Converter ID is required")
    private Long converterId;
    @NotNull(message = "Input value is required")
    private Double inputValue;
    @NotNull(message = "Output value is required")
    private Double outputValue;
}
