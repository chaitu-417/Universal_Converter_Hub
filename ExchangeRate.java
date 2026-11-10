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
