package com.converterhub.dto.category;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import com.converterhub.entity.Category;
import lombok.Builder;

@Data
public class CategoryRequest {
    @NotBlank(message = "Name is required")
    private String name;
    private String description;
    @NotBlank(message = "Icon is required")
    private String icon;
}
