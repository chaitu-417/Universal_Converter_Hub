package com.converterhub.service;

import com.converterhub.entity.Analytics;
import com.converterhub.entity.Converter;
import com.converterhub.repository.AnalyticsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AnalyticsService {

    private final AnalyticsRepository analyticsRepository;

    public AnalyticsService(AnalyticsRepository analyticsRepository) {
        this.analyticsRepository = analyticsRepository;
    }

    @Transactional
    public void incrementUsage(Converter converter) {
        LocalDate today = LocalDate.now();
        Analytics analytics = analyticsRepository.findByConverterIdAndDateRecord(converter.getId(), today)
                .orElse(Analytics.builder()
                        .converter(converter)
                        .dateRecord(today)
                        .usageCount(0L)
                        .build());
        
        analytics.setUsageCount(analytics.getUsageCount() + 1);
        analyticsRepository.save(analytics);
    }

    public List<Analytics> getTop10Trending() {
        return analyticsRepository.findTop10ByDateRecordOrderByUsageCountDesc(LocalDate.now());
    }
}
