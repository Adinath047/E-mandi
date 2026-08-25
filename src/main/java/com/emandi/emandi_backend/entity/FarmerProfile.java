package com.emandi.emandi_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "farmer_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FarmerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Double farmSize; // in acres

    private Integer farmingExperience; // in years

    @Column(length = 100)
    private String farmType; // Organic, Conventional, etc.

    @ElementCollection
    @CollectionTable(name = "farmer_commodities", joinColumns = @JoinColumn(name = "farmer_id"))
    @Column(name = "commodity", length = 50)
    private List<String> primaryCommodities;

    @Column(length = 200)
    private String farmLocation;

    private Boolean organicCertified = false;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}