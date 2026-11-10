package com.converterhub.repository;

import com.converterhub.entity.ConversionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface ConversionHistoryRepository extends JpaRepository<ConversionHistory, Long> {
    Page<ConversionHistory> findByUserId(Long userId, Pageable pageable);
}
