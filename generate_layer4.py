import os

base_dir = r"C:\Users\HP\.gemini\antigravity\scratch\universal-converter-hub\backend"

def write_file(path, content):
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

auth_service = """
package com.converterhub.service;

import com.converterhub.dto.auth.LoginRequest;
import com.converterhub.dto.auth.RegisterRequest;
import com.converterhub.dto.auth.TokenResponse;
import com.converterhub.entity.Role;
import com.converterhub.entity.User;
import com.converterhub.exception.BadRequestException;
import com.converterhub.repository.UserRepository;
import com.converterhub.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository,
                       PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public TokenResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        log.info("User {} logged in successfully", loginRequest.getEmail());
        return new TokenResponse(jwt);
    }

    @Transactional
    public void register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new BadRequestException("Email Address already in use!");
        }

        User user = User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.ROLE_USER)
                .build();

        userRepository.save(user);
        log.info("User {} registered successfully", registerRequest.getEmail());
    }
}
"""

category_service = """
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
"""

converter_service = """
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
"""

favorite_service = """
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
"""

history_service = """
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
"""

analytics_service = """
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
"""

currency_service = """
package com.converterhub.service;

import com.converterhub.dto.currency.ConvertCurrencyRequest;
import com.converterhub.dto.currency.ConvertCurrencyResponse;
import com.converterhub.entity.ExchangeRate;
import com.converterhub.exception.BadRequestException;
import com.converterhub.repository.ExchangeRateRepository;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CurrencyService {

    private final ExchangeRateRepository exchangeRateRepository;

    public CurrencyService(ExchangeRateRepository exchangeRateRepository) {
        this.exchangeRateRepository = exchangeRateRepository;
    }

    public ConvertCurrencyResponse convert(ConvertCurrencyRequest request) {
        ExchangeRate fromRate = exchangeRateRepository.findByCurrencyCode(request.getFromCurrency().toUpperCase())
                .orElseThrow(() -> new BadRequestException("Unsupported currency: " + request.getFromCurrency()));
        ExchangeRate toRate = exchangeRateRepository.findByCurrencyCode(request.getToCurrency().toUpperCase())
                .orElseThrow(() -> new BadRequestException("Unsupported currency: " + request.getToCurrency()));

        // conversion through USD
        Double amountInUsd = request.getAmount() / fromRate.getRateToUsd();
        Double convertedAmount = amountInUsd * toRate.getRateToUsd();
        Double finalRate = toRate.getRateToUsd() / fromRate.getRateToUsd();

        log.info("Converted {} {} to {}", request.getAmount(), request.getFromCurrency(), request.getToCurrency());

        return ConvertCurrencyResponse.builder()
                .fromCurrency(request.getFromCurrency().toUpperCase())
                .toCurrency(request.getToCurrency().toUpperCase())
                .amount(request.getAmount())
                .convertedAmount(convertedAmount)
                .rate(finalRate)
                .build();
    }
}
"""

user_service = """
package com.converterhub.service;

import com.converterhub.dto.user.UserResponse;
import com.converterhub.entity.User;
import com.converterhub.exception.ResourceNotFoundException;
import com.converterhub.repository.UserRepository;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return UserResponse.fromEntity(user);
    }
}
"""

search_service = """
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
"""

write_file("src/main/java/com/converterhub/service/AuthService.java", auth_service)
write_file("src/main/java/com/converterhub/service/CategoryService.java", category_service)
write_file("src/main/java/com/converterhub/service/ConverterService.java", converter_service)
write_file("src/main/java/com/converterhub/service/FavoriteService.java", favorite_service)
write_file("src/main/java/com/converterhub/service/HistoryService.java", history_service)
write_file("src/main/java/com/converterhub/service/AnalyticsService.java", analytics_service)
write_file("src/main/java/com/converterhub/service/CurrencyService.java", currency_service)
write_file("src/main/java/com/converterhub/service/UserService.java", user_service)
write_file("src/main/java/com/converterhub/service/SearchService.java", search_service)

print("Layer 4 generated successfully.")
