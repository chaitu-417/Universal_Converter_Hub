package com.converterhub.service;

import com.converterhub.dto.common.PageResponse;
import com.converterhub.dto.history.HistoryRequest;
import com.converterhub.entity.ConversionHistory;
import com.converterhub.entity.Converter;
import com.converterhub.entity.User;
import com.converterhub.exception.ResourceNotFoundException;
import com.converterhub.repository.ConversionHistoryRepository;
import com.converterhub.repository.ConverterRepository;
import com.converterhub.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class HistoryService {

    private final ConversionHistoryRepository historyRepository;
    private final UserRepository userRepository;
    private final ConverterRepository converterRepository;
    private final AnalyticsService analyticsService;

    public HistoryService(ConversionHistoryRepository historyRepository, UserRepository userRepository,
                          ConverterRepository converterRepository, AnalyticsService analyticsService) {
        this.historyRepository = historyRepository;
        this.userRepository = userRepository;
        this.converterRepository = converterRepository;
        this.analyticsService = analyticsService;
    }

    @Transactional
    public void recordHistory(Long userId, HistoryRequest request) {
        User user = userId != null ? userRepository.findById(userId).orElse(null) : null;
        Converter converter = converterRepository.findById(request.getConverterId())
                .orElseThrow(() -> new ResourceNotFoundException("Converter not found"));

        ConversionHistory history = ConversionHistory.builder()
                .user(user)
                .converter(converter)
                .inputValue(request.getInputValue())
                .outputValue(request.getOutputValue())
                .fromUnit(converter.getFromUnit())
                .toUnit(converter.getToUnit())
                .build();

        historyRepository.save(history);
        analyticsService.incrementUsage(converter);
        log.info("History recorded for converter {}", converter.getId());
    }

    public PageResponse<ConversionHistory> getUserHistory(Long userId, Pageable pageable) {
        Page<ConversionHistory> page = historyRepository.findByUserId(userId, pageable);
        return PageResponse.of(page);
    }
}
