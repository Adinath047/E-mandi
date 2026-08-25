package com.emandi.emandi_backend.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "buyer_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BuyerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String companyName;

    @Enumerated(EnumType.STRING)
    private BusinessType businessType;

    @Column(length = 15)
    private String gstNumber;

    @Column(length = 20)
    private String cinNumber;

    @ElementCollection
    @CollectionTable(name = "buyer_commodities", joinColumns = @JoinColumn(name = "buyer_id"))
    @Column(name = "commodity", length = 50)
    private List<String> interestedCommodities;

    @Column(length = 200)
    private String businessAddress;

    private Integer yearsInBusiness;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum BusinessType {
        RETAILER, WHOLESALER, PROCESSOR, EXPORTER, DISTRIBUTOR
    }
}