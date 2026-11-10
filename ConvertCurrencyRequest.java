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
