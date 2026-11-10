package com.converterhub.service;

import com.converterhub.dto.converter.ConverterResponse;
import com.converterhub.repository.ConverterRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SearchService {
    private final ConverterRepository converterRepository;

    public SearchService(ConverterRepository converterRepository) {
        this.converterRepository = converterRepository;
    }

    public List<ConverterResponse> searchConverters(String query) {
        return converterRepository.findByNameContainingIgnoreCase(query).stream()
                .map(ConverterResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
