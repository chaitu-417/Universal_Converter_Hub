package com.converterhub.service;

import com.converterhub.dto.currency.ConvertCurrencyRequest;
import com.converterhub.dto.currency.ConvertCurrencyResponse;
import com.converterhub.entity.ExchangeRate;
import com.converterhub.exception.BadRequestException;
import com.converterhub.repository.ExchangeRateRepository;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CurrencyService {

    private final ExchangeRateRepository exchangeRateRepository;

    public CurrencyService(ExchangeRateRepository exchangeRateRepository) {
        this.exchangeRateRepository = exchangeRateRepository;
    }

    public ConvertCurrencyResponse convert(ConvertCurrencyRequest request) {
        ExchangeRate fromRate = exchangeRateRepository.findByCurrencyCode(request.getFromCurrency().toUpperCase())
                .orElseThrow(() -> new BadRequestException("Unsupported currency: " + request.getFromCurrency()));
        ExchangeRate toRate = exchangeRateRepository.findByCurrencyCode(request.getToCurrency().toUpperCase())
                .orElseThrow(() -> new BadRequestException("Unsupported currency: " + request.getToCurrency()));

        // conversion through USD
        Double amountInUsd = request.getAmount() / fromRate.getRateToUsd();
        Double convertedAmount = amountInUsd * toRate.getRateToUsd();
        Double finalRate = toRate.getRateToUsd() / fromRate.getRateToUsd();

        log.info("Converted {} {} to {}", request.getAmount(), request.getFromCurrency(), request.getToCurrency());

        return ConvertCurrencyResponse.builder()
                .fromCurrency(request.getFromCurrency().toUpperCase())
                .toCurrency(request.getToCurrency().toUpperCase())
                .amount(request.getAmount())
                .convertedAmount(convertedAmount)
                .rate(finalRate)
                .build();
    }
}
