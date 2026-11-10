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
