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
