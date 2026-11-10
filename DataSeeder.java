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
