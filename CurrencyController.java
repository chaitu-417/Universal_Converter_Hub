package com.converterhub.controller;

import com.converterhub.dto.common.ApiResponse;
import com.converterhub.dto.currency.ConvertCurrencyRequest;
import com.converterhub.dto.currency.ConvertCurrencyResponse;
import com.converterhub.service.CurrencyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/currency")
public class CurrencyController {
    private final CurrencyService currencyService;

    public CurrencyController(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    @PostMapping("/convert")
    public ResponseEntity<ApiResponse<ConvertCurrencyResponse>> convert(@Valid @RequestBody ConvertCurrencyRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Currency converted", currencyService.convert(request)));
    }
}
