package com.converterhub.repository;

import com.converterhub.entity.Analytics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

@Repository
public interface AnalyticsRepository extends JpaRepository<Analytics, Long> {
    Optional<Analytics> findByConverterIdAndDateRecord(Long converterId, LocalDate dateRecord);
    List<Analytics> findTop10ByDateRecordOrderByUsageCountDesc(LocalDate dateRecord);
}
