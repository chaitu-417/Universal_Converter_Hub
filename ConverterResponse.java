package com.converterhub.dto.converter;

import com.converterhub.entity.Converter;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConverterResponse {
    private Long id;
    private String name;
    private String description;
    private Long categoryId;
    private String categoryName;
    private String fromUnit;
    private String toUnit;
    private String conversionFormula;

    public static ConverterResponse fromEntity(Converter converter) {
        return ConverterResponse.builder()
                .id(converter.getId())
                .name(converter.getName())
                .description(converter.getDescription())
                .categoryId(converter.getCategory().getId())
                .categoryName(converter.getCategory().getName())
                .fromUnit(converter.getFromUnit())
                .toUnit(converter.getToUnit())
                .conversionFormula(converter.getConversionFormula())
                .build();
    }
}
