import os

base_dir = r"C:\Users\HP\.gemini\antigravity\scratch\universal-converter-hub\backend"

def write_file(path, content):
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

api_response = """
package com.converterhub.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;

    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.<T>builder().success(true).message(message).data(data).build();
    }

    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder().success(false).message(message).build();
    }
}
"""

page_response = """
package com.converterhub.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageResponse<T> {
    private List<T> content;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;

    public static <T> PageResponse<T> of(Page<T> page) {
        return PageResponse.<T>builder()
                .content(page.getContent())
                .pageNo(page.getNumber())
                .pageSize(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .build();
    }
}
"""

auth_dtos = """
package com.converterhub.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;
}
"""

register_request = """
package com.converterhub.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}
"""

token_response = """
package com.converterhub.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    
    public TokenResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}
"""

user_response = """
package com.converterhub.dto.user;

import com.converterhub.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String role;

    public static UserResponse fromEntity(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}
"""

category_dto = """
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
"""

category_res = """
package com.converterhub.dto.category;

import com.converterhub.entity.Category;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryResponse {
    private Long id;
    private String name;
    private String description;
    private String icon;

    public static CategoryResponse fromEntity(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .icon(category.getIcon())
                .build();
    }
}
"""

converter_req = """
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
"""

converter_res = """
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
"""

favorite_req = """
package com.converterhub.dto.favorite;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FavoriteRequest {
    @NotNull(message = "Converter ID is required")
    private Long converterId;
}
"""

history_req = """
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
"""

currency_req = """
package com.converterhub.dto.currency;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ConvertCurrencyRequest {
    @NotBlank(message = "From currency is required")
    private String fromCurrency;
    @NotBlank(message = "To currency is required")
    private String toCurrency;
    @NotNull(message = "Amount is required")
    private Double amount;
}
"""

currency_res = """
package com.converterhub.dto.currency;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConvertCurrencyResponse {
    private String fromCurrency;
    private String toCurrency;
    private Double amount;
    private Double convertedAmount;
    private Double rate;
}
"""

exceptions = """
package com.converterhub.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
"""
bad_req = """
package com.converterhub.exception;

public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}
"""
unauth = """
package com.converterhub.exception;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}
"""

global_ex = """
package com.converterhub.exception;

import com.converterhub.dto.common.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse<Void> handleResourceNotFound(ResourceNotFoundException ex) {
        return ApiResponse.error(ex.getMessage());
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<Void> handleBadRequest(BadRequestException ex) {
        return ApiResponse.error(ex.getMessage());
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponse<Void> handleUnauthorized(UnauthorizedException ex) {
        return ApiResponse.error(ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<Void> handleValidation(MethodArgumentNotValidException ex) {
        String errors = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));
        return ApiResponse.error("Validation failed: " + errors);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse<Void> handleGenericException(Exception ex) {
        return ApiResponse.error("An unexpected error occurred: " + ex.getMessage());
    }
}
"""

write_file("src/main/java/com/converterhub/dto/common/ApiResponse.java", api_response)
write_file("src/main/java/com/converterhub/dto/common/PageResponse.java", page_response)
write_file("src/main/java/com/converterhub/dto/auth/LoginRequest.java", auth_dtos)
write_file("src/main/java/com/converterhub/dto/auth/RegisterRequest.java", register_request)
write_file("src/main/java/com/converterhub/dto/auth/TokenResponse.java", token_response)
write_file("src/main/java/com/converterhub/dto/user/UserResponse.java", user_response)
write_file("src/main/java/com/converterhub/dto/category/CategoryRequest.java", category_dto)
write_file("src/main/java/com/converterhub/dto/category/CategoryResponse.java", category_res)
write_file("src/main/java/com/converterhub/dto/converter/ConverterRequest.java", converter_req)
write_file("src/main/java/com/converterhub/dto/converter/ConverterResponse.java", converter_res)
write_file("src/main/java/com/converterhub/dto/favorite/FavoriteRequest.java", favorite_req)
write_file("src/main/java/com/converterhub/dto/history/HistoryRequest.java", history_req)
write_file("src/main/java/com/converterhub/dto/currency/ConvertCurrencyRequest.java", currency_req)
write_file("src/main/java/com/converterhub/dto/currency/ConvertCurrencyResponse.java", currency_res)

write_file("src/main/java/com/converterhub/exception/ResourceNotFoundException.java", exceptions)
write_file("src/main/java/com/converterhub/exception/BadRequestException.java", bad_req)
write_file("src/main/java/com/converterhub/exception/UnauthorizedException.java", unauth)
write_file("src/main/java/com/converterhub/exception/GlobalExceptionHandler.java", global_ex)

print("Layer 2 generated successfully.")
