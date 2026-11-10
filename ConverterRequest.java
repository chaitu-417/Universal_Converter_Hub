package com.converterhub.dto.converter;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ConverterRequest {
    @NotBlank(message = "Name is required")
    private String name;
    private String description;
    @NotNull(message = "Category ID is required")
    private Long categoryId;
    @NotBlank(message = "From unit is required")
    private String fromUnit;
    @NotBlank(message = "To unit is required")
    private String toUnit;
    @NotBlank(message = "Conversion formula is required")
    private String conversionFormula;
}
