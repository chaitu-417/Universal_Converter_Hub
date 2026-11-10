package com.converterhub.service;

import com.converterhub.dto.common.PageResponse;
import com.converterhub.dto.converter.ConverterResponse;
import com.converterhub.dto.favorite.FavoriteRequest;
import com.converterhub.entity.Converter;
import com.converterhub.entity.Favorite;
import com.converterhub.entity.User;
import com.converterhub.exception.BadRequestException;
import com.converterhub.exception.ResourceNotFoundException;
import com.converterhub.repository.ConverterRepository;
import com.converterhub.repository.FavoriteRepository;
import com.converterhub.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final ConverterRepository converterRepository;

    public FavoriteService(FavoriteRepository favoriteRepository, UserRepository userRepository, ConverterRepository converterRepository) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.converterRepository = converterRepository;
    }

    public PageResponse<ConverterResponse> getUserFavorites(Long userId, Pageable pageable) {
        Page<Favorite> page = favoriteRepository.findByUserId(userId, pageable);
        return PageResponse.of(page.map(fav -> ConverterResponse.fromEntity(fav.getConverter())));
    }

    @Transactional
    public void addFavorite(Long userId, FavoriteRequest request) {
        if (favoriteRepository.existsByUserIdAndConverterId(userId, request.getConverterId())) {
            throw new BadRequestException("Already in favorites");
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Converter converter = converterRepository.findById(request.getConverterId())
                .orElseThrow(() -> new ResourceNotFoundException("Converter not found"));

        Favorite favorite = Favorite.builder()
                .user(user)
                .converter(converter)
                .build();
        favoriteRepository.save(favorite);
        log.info("User {} added favorite {}", userId, converter.getId());
    }

    @Transactional
    public void removeFavorite(Long userId, Long converterId) {
        Favorite favorite = favoriteRepository.findByUserIdAndConverterId(userId, converterId)
                .orElseThrow(() -> new ResourceNotFoundException("Favorite not found"));
        favoriteRepository.delete(favorite);
        log.info("User {} removed favorite {}", userId, converterId);
    }
}
