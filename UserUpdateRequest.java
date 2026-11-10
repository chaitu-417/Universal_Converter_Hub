package com.converterhub.dto.user;

import jakarta.validation.constraints.Size;

/**
 * Request DTO for updating user profile fields.
 */
public record UserUpdateRequest(
        @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
        String username,

        @Size(max = 50, message = "First name cannot exceed 50 characters")
        String firstName,

        @Size(max = 50, message = "Last name cannot exceed 50 characters")
        String lastName
) {
}
