import os

base_dir = r"C:\Users\HP\.gemini\antigravity\scratch\universal-converter-hub\backend"

def write_file(path, content):
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

pom_xml = """
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.0</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.converterhub</groupId>
    <artifactId>backend</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>backend</name>
    <description>Universal Converter Hub Backend</description>
    <properties>
        <java.version>21</java.version>
        <jjwt.version>0.11.5</jjwt.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-cache</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>2.5.0</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>${jjwt.version}</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>com.bucket4j</groupId>
            <artifactId>bucket4j-core</artifactId>
            <version>8.10.1</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
"""

application_yml = """
spring:
  profiles:
    active: dev
  application:
    name: converter-hub

server:
  port: 8080

app:
  jwt:
    secret: 404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
    expiration: 86400000
    refresh-expiration: 604800000
"""

application_dev_yml = """
spring:
  datasource:
    url: jdbc:h2:mem:converterhubdb
    driverClassName: org.h2.Driver
    username: sa
    password: password
  h2:
    console:
      enabled: true
      path: /h2-console
  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: update
    show-sql: true
  cache:
    type: simple
"""

application_prod_yml = """
spring:
  datasource:
    url: jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_NAME:converterhub}
    username: ${DB_USER:postgres}
    password: ${DB_PASS:password}
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
  data:
    redis:
      host: ${REDIS_HOST:localhost}
      port: ${REDIS_PORT:6379}
  cache:
    type: redis
"""

main_class = """
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
"""

base_entity = """
package com.converterhub.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "is_deleted", nullable = false)
    private boolean deleted = false;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
"""

role_enum = """
package com.converterhub.entity;

public enum Role {
    ROLE_USER,
    ROLE_ADMIN
}
"""

user_entity = """
package com.converterhub.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Where(clause = "is_deleted = false")
public class User extends BaseEntity {

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
}
"""

category_entity = """
package com.converterhub.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Where(clause = "is_deleted = false")
public class Category extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private String icon;
}
"""

converter_entity = """
package com.converterhub.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "converters")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Where(clause = "is_deleted = false")
public class Converter extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "from_unit", nullable = false)
    private String fromUnit;

    @Column(name = "to_unit", nullable = false)
    private String toUnit;

    @Column(name = "conversion_formula", nullable = false)
    private String conversionFormula;
}
"""

favorite_entity = """
package com.converterhub.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "favorites")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Where(clause = "is_deleted = false")
public class Favorite extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "converter_id", nullable = false)
    private Converter converter;
}
"""

history_entity = """
package com.converterhub.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "conversion_histories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Where(clause = "is_deleted = false")
public class ConversionHistory extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "converter_id")
    private Converter converter;

    @Column(name = "input_value", nullable = false)
    private Double inputValue;

    @Column(name = "output_value", nullable = false)
    private Double outputValue;

    @Column(name = "from_unit", nullable = false)
    private String fromUnit;

    @Column(name = "to_unit", nullable = false)
    private String toUnit;
}
"""

analytics_entity = """
package com.converterhub.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "analytics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Where(clause = "is_deleted = false")
public class Analytics extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "converter_id")
    private Converter converter;

    @Column(name = "usage_count", nullable = false)
    private Long usageCount = 0L;
    
    @Column(name = "date_record")
    private java.time.LocalDate dateRecord;
}
"""

exchange_rate_entity = """
package com.converterhub.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "exchange_rates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Where(clause = "is_deleted = false")
public class ExchangeRate extends BaseEntity {

    @Column(name = "currency_code", nullable = false, unique = true)
    private String currencyCode;

    @Column(name = "rate_to_usd", nullable = false)
    private Double rateToUsd;
    
    @Column(name = "last_fetched_at")
    private java.time.LocalDateTime lastFetchedAt;
}
"""

user_repo = """
package com.converterhub.repository;

import com.converterhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
"""

category_repo = """
package com.converterhub.repository;

import com.converterhub.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);
    boolean existsByName(String name);
}
"""

converter_repo = """
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
"""

favorite_repo = """
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
"""

history_repo = """
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
"""

analytics_repo = """
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
"""

exchange_rate_repo = """
package com.converterhub.repository;

import com.converterhub.entity.ExchangeRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExchangeRateRepository extends JpaRepository<ExchangeRate, Long> {
    Optional<ExchangeRate> findByCurrencyCode(String currencyCode);
}
"""

write_file("pom.xml", pom_xml)
write_file("src/main/resources/application.yml", application_yml)
write_file("src/main/resources/application-dev.yml", application_dev_yml)
write_file("src/main/resources/application-prod.yml", application_prod_yml)
write_file("src/main/java/com/converterhub/ConverterHubApplication.java", main_class)
write_file("src/main/java/com/converterhub/entity/BaseEntity.java", base_entity)
write_file("src/main/java/com/converterhub/entity/Role.java", role_enum)
write_file("src/main/java/com/converterhub/entity/User.java", user_entity)
write_file("src/main/java/com/converterhub/entity/Category.java", category_entity)
write_file("src/main/java/com/converterhub/entity/Converter.java", converter_entity)
write_file("src/main/java/com/converterhub/entity/Favorite.java", favorite_entity)
write_file("src/main/java/com/converterhub/entity/ConversionHistory.java", history_entity)
write_file("src/main/java/com/converterhub/entity/Analytics.java", analytics_entity)
write_file("src/main/java/com/converterhub/entity/ExchangeRate.java", exchange_rate_entity)
write_file("src/main/java/com/converterhub/repository/UserRepository.java", user_repo)
write_file("src/main/java/com/converterhub/repository/CategoryRepository.java", category_repo)
write_file("src/main/java/com/converterhub/repository/ConverterRepository.java", converter_repo)
write_file("src/main/java/com/converterhub/repository/FavoriteRepository.java", favorite_repo)
write_file("src/main/java/com/converterhub/repository/ConversionHistoryRepository.java", history_repo)
write_file("src/main/java/com/converterhub/repository/AnalyticsRepository.java", analytics_repo)
write_file("src/main/java/com/converterhub/repository/ExchangeRateRepository.java", exchange_rate_repo)

print("Layer 1 generated successfully.")
