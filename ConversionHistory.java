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
