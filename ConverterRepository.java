package com.converterhub.repository;

import com.converterhub.entity.Converter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface ConverterRepository extends JpaRepository<Converter, Long> {
    Page<Converter> findByCategoryId(Long categoryId, Pageable pageable);
    List<Converter> findByNameContainingIgnoreCase(String name);
}
