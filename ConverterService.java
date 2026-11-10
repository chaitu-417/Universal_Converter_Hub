package com.converterhub.service;

import com.converterhub.dto.common.PageResponse;
import com.converterhub.dto.converter.ConverterRequest;
import com.converterhub.dto.converter.ConverterResponse;
import com.converterhub.entity.Category;
import com.converterhub.entity.Converter;
import com.converterhub.exception.ResourceNotFoundException;
import com.converterhub.repository.CategoryRepository;
import com.converterhub.repository.ConverterRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ConverterService {

    private final ConverterRepository converterRepository;
    private final CategoryRepository categoryRepository;

    public ConverterService(ConverterRepository converterRepository, CategoryRepository categoryRepository) {
        this.converterRepository = converterRepository;
        this.categoryRepository = categoryRepository;
    }

    public PageResponse<ConverterResponse> getConvertersByCategory(Long categoryId, Pageable pageable) {
        Page<Converter> page = converterRepository.findByCategoryId(categoryId, pageable);
        return PageResponse.of(page.map(ConverterResponse::fromEntity));
    }

    public ConverterResponse getConverter(Long id) {
        Converter converter = converterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Converter not found"));
        return ConverterResponse.fromEntity(converter);
    }

    @Transactional
    public ConverterResponse createConverter(ConverterRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Converter converter = Converter.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(category)
                .fromUnit(request.getFromUnit())
                .toUnit(request.getToUnit())
                .conversionFormula(request.getConversionFormula())
                .build();

        converter = converterRepository.save(converter);
        log.info("Converter {} created", converter.getName());
        return ConverterResponse.fromEntity(converter);
    }

    @Transactional
    public void deleteConverter(Long id) {
        Converter converter = converterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Converter not found"));
        converter.setDeleted(true);
        converter.setDeletedAt(java.time.LocalDateTime.now());
        converterRepository.save(converter);
        log.info("Converter {} deleted", id);
    }
}
