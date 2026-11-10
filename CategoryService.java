package com.converterhub.service;

import com.converterhub.dto.category.CategoryRequest;
import com.converterhub.dto.category.CategoryResponse;
import com.converterhub.entity.Category;
import com.converterhub.exception.BadRequestException;
import com.converterhub.exception.ResourceNotFoundException;
import com.converterhub.repository.CategoryRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Cacheable(value = "categories")
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(CategoryResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    @CacheEvict(value = "categories", allEntries = true)
    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.existsByName(request.getName())) {
            throw new BadRequestException("Category with this name already exists");
        }
        Category category = Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .icon(request.getIcon())
                .build();
        category = categoryRepository.save(category);
        log.info("Category {} created", category.getName());
        return CategoryResponse.fromEntity(category);
    }

    @Transactional
    @CacheEvict(value = "categories", allEntries = true)
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        category.setDeleted(true);
        category.setDeletedAt(java.time.LocalDateTime.now());
        categoryRepository.save(category);
        log.info("Category {} deleted", id);
    }
}
