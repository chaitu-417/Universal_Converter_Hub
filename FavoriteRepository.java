package com.converterhub.repository;

import com.converterhub.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Page<Favorite> findByUserId(Long userId, Pageable pageable);
    Optional<Favorite> findByUserIdAndConverterId(Long userId, Long converterId);
    boolean existsByUserIdAndConverterId(Long userId, Long converterId);
}
