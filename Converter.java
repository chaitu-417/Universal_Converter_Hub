package com.converterhub.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "converters", indexes = {
    @Index(name = "idx_converter_name", columnList = "name"),
    @Index(name = "idx_converter_category", columnList = "category_id")
})
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
