package com.converterhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ConverterHubApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConverterHubApplication.class, args);
    }
}
