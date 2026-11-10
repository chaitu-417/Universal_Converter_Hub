import os

base_dir = r"C:\Users\HP\.gemini\antigravity\scratch\universal-converter-hub\backend"

def write_file(path, content):
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

auth_controller = """
package com.converterhub.controller;

import com.converterhub.dto.auth.LoginRequest;
import com.converterhub.dto.auth.RegisterRequest;
import com.converterhub.dto.auth.TokenResponse;
import com.converterhub.dto.common.ApiResponse;
import com.converterhub.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponse>> login(@Valid @RequestBody LoginRequest request) {
        TokenResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("User registered successfully", null));
    }
}
"""

category_controller = """
package com.converterhub.controller;

import com.converterhub.dto.category.CategoryRequest;
import com.converterhub.dto.category.CategoryResponse;
import com.converterhub.dto.common.ApiResponse;
import com.converterhub.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAllCategories() {
        return ResponseEntity.ok(ApiResponse.success("Categories fetched", categoryService.getAllCategories()));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CategoryResponse>> createCategory(@Valid @RequestBody CategoryRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Category created", categoryService.createCategory(request)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(ApiResponse.success("Category deleted", null));
    }
}
"""

converter_controller = """
package com.converterhub.controller;

import com.converterhub.dto.common.ApiResponse;
import com.converterhub.dto.common.PageResponse;
import com.converterhub.dto.converter.ConverterRequest;
import com.converterhub.dto.converter.ConverterResponse;
import com.converterhub.service.ConverterService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/converters")
public class ConverterController {
    private final ConverterService converterService;

    public ConverterController(ConverterService converterService) {
        this.converterService = converterService;
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<PageResponse<ConverterResponse>>> getByCategory(@PathVariable Long categoryId, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("Converters fetched", converterService.getConvertersByCategory(categoryId, pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ConverterResponse>> getConverter(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Converter fetched", converterService.getConverter(id)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ConverterResponse>> createConverter(@Valid @RequestBody ConverterRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Converter created", converterService.createConverter(request)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteConverter(@PathVariable Long id) {
        converterService.deleteConverter(id);
        return ResponseEntity.ok(ApiResponse.success("Converter deleted", null));
    }
}
"""

favorite_controller = """
package com.converterhub.controller;

import com.converterhub.dto.common.ApiResponse;
import com.converterhub.dto.common.PageResponse;
import com.converterhub.dto.converter.ConverterResponse;
import com.converterhub.dto.favorite.FavoriteRequest;
import com.converterhub.security.UserPrincipal;
import com.converterhub.service.FavoriteService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {
    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ConverterResponse>>> getUserFavorites(
            @AuthenticationPrincipal UserPrincipal user, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("Favorites fetched", favoriteService.getUserFavorites(user.getId(), pageable)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> addFavorite(
            @AuthenticationPrincipal UserPrincipal user, @Valid @RequestBody FavoriteRequest request) {
        favoriteService.addFavorite(user.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Added to favorites", null));
    }

    @DeleteMapping("/{converterId}")
    public ResponseEntity<ApiResponse<Void>> removeFavorite(
            @AuthenticationPrincipal UserPrincipal user, @PathVariable Long converterId) {
        favoriteService.removeFavorite(user.getId(), converterId);
        return ResponseEntity.ok(ApiResponse.success("Removed from favorites", null));
    }
}
"""

history_controller = """
package com.converterhub.controller;

import com.converterhub.dto.common.ApiResponse;
import com.converterhub.dto.common.PageResponse;
import com.converterhub.dto.history.HistoryRequest;
import com.converterhub.entity.ConversionHistory;
import com.converterhub.security.UserPrincipal;
import com.converterhub.service.HistoryService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/history")
public class HistoryController {
    private final HistoryService historyService;

    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> recordHistory(
            @AuthenticationPrincipal UserPrincipal user, @Valid @RequestBody HistoryRequest request) {
        Long userId = user != null ? user.getId() : null;
        historyService.recordHistory(userId, request);
        return ResponseEntity.ok(ApiResponse.success("History recorded", null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ConversionHistory>>> getHistory(
            @AuthenticationPrincipal UserPrincipal user, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("History fetched", historyService.getUserHistory(user.getId(), pageable)));
    }
}
"""

analytics_controller = """
package com.converterhub.controller;

import com.converterhub.dto.common.ApiResponse;
import com.converterhub.entity.Analytics;
import com.converterhub.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/trending")
    public ResponseEntity<ApiResponse<List<Analytics>>> getTrending() {
        return ResponseEntity.ok(ApiResponse.success("Trending fetched", analyticsService.getTop10Trending()));
    }
}
"""

currency_controller = """
package com.converterhub.controller;

import com.converterhub.dto.common.ApiResponse;
import com.converterhub.dto.currency.ConvertCurrencyRequest;
import com.converterhub.dto.currency.ConvertCurrencyResponse;
import com.converterhub.service.CurrencyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/currency")
public class CurrencyController {
    private final CurrencyService currencyService;

    public CurrencyController(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    @PostMapping("/convert")
    public ResponseEntity<ApiResponse<ConvertCurrencyResponse>> convert(@Valid @RequestBody ConvertCurrencyRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Currency converted", currencyService.convert(request)));
    }
}
"""

user_controller = """
package com.converterhub.controller;

import com.converterhub.dto.common.ApiResponse;
import com.converterhub.dto.user.UserResponse;
import com.converterhub.security.UserPrincipal;
import com.converterhub.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getProfile(@AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(ApiResponse.success("Profile fetched", userService.getUserProfile(user.getId())));
    }
}
"""

search_controller = """
package com.converterhub.controller;

import com.converterhub.dto.common.ApiResponse;
import com.converterhub.dto.converter.ConverterResponse;
import com.converterhub.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ConverterResponse>>> search(@RequestParam String q) {
        return ResponseEntity.ok(ApiResponse.success("Search results", searchService.searchConverters(q)));
    }
}
"""

admin_controller = """
package com.converterhub.controller;

import com.converterhub.dto.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<String>> getDashboard() {
        return ResponseEntity.ok(ApiResponse.success("Admin dashboard accessed", "Dashboard Data"));
    }
}
"""

data_seeder = """
package com.converterhub.seeder;

import com.converterhub.entity.*;
import com.converterhub.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Profile("dev")
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ConverterRepository converterRepository;
    private final PasswordEncoder passwordEncoder;
    private final ExchangeRateRepository exchangeRateRepository;

    public DataSeeder(UserRepository userRepository, CategoryRepository categoryRepository,
                      ConverterRepository converterRepository, PasswordEncoder passwordEncoder,
                      ExchangeRateRepository exchangeRateRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.converterRepository = converterRepository;
        this.passwordEncoder = passwordEncoder;
        this.exchangeRateRepository = exchangeRateRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .name("Admin User")
                    .email("admin@converterhub.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ROLE_ADMIN)
                    .build();
            userRepository.save(admin);

            Category length = Category.builder().name("Length").description("Length converters").icon("ruler").build();
            Category weight = Category.builder().name("Weight").description("Weight converters").icon("weight").build();
            categoryRepository.saveAll(Arrays.asList(length, weight));

            Converter cmToIn = Converter.builder()
                    .name("Centimeter to Inch")
                    .description("Convert cm to inches")
                    .category(length)
                    .fromUnit("cm")
                    .toUnit("inch")
                    .conversionFormula("x / 2.54")
                    .build();
            converterRepository.save(cmToIn);
            
            ExchangeRate usd = ExchangeRate.builder().currencyCode("USD").rateToUsd(1.0).build();
            ExchangeRate eur = ExchangeRate.builder().currencyCode("EUR").rateToUsd(1.1).build();
            exchangeRateRepository.saveAll(Arrays.asList(usd, eur));
        }
    }
}
"""

write_file("src/main/java/com/converterhub/controller/AuthController.java", auth_controller)
write_file("src/main/java/com/converterhub/controller/CategoryController.java", category_controller)
write_file("src/main/java/com/converterhub/controller/ConverterController.java", converter_controller)
write_file("src/main/java/com/converterhub/controller/FavoriteController.java", favorite_controller)
write_file("src/main/java/com/converterhub/controller/HistoryController.java", history_controller)
write_file("src/main/java/com/converterhub/controller/AnalyticsController.java", analytics_controller)
write_file("src/main/java/com/converterhub/controller/CurrencyController.java", currency_controller)
write_file("src/main/java/com/converterhub/controller/UserController.java", user_controller)
write_file("src/main/java/com/converterhub/controller/SearchController.java", search_controller)
write_file("src/main/java/com/converterhub/controller/AdminController.java", admin_controller)
write_file("src/main/java/com/converterhub/seeder/DataSeeder.java", data_seeder)

print("Layer 5 generated successfully.")
