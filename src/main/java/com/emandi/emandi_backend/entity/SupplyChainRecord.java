package com.emandi.emandi_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "supply_chain_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplyChainRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String trackingId;

    @ManyToOne
    @JoinColumn(name = "farmer_id", nullable = false)
    private User farmer;

    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer;

    @OneToOne
    @JoinColumn(name = "transaction_id")
    private Transcation transaction;

    @Column(nullable = false, length = 50)
    private String commodity;

    @Column(nullable = false)
    private Double quantity;

    @Column(nullable = false, length = 20)
    private String unit;

    @Enumerated(EnumType.STRING)
    private SupplyChainStatus status = SupplyChainStatus.HARVESTED;

    @Column(length = 200)
    private String currentLocation;

    @Column(length = 200)
    private String originLocation;

    @Column(length = 200)
    private String destinationLocation;

    @Column(length = 50)
    private String batchNumber;

    @OneToMany(mappedBy = "supplyChainRecord", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SupplyChainCheckpoint> checkpoints;

    private LocalDateTime harvestedAt;
    private LocalDateTime processedAt;
    private LocalDateTime shippedAt;
    private LocalDateTime deliveredAt;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum SupplyChainStatus {
        HARVESTED, PROCESSED, PACKAGED, SHIPPED, IN_TRANSIT, DELIVERED, REJECTED
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }

    public User getFarmer() {
        return farmer;
    }

    public void setFarmer(User farmer) {
        this.farmer = farmer;
    }

    public User getBuyer() {
        return buyer;
    }

    public void setBuyer(User buyer) {
        this.buyer = buyer;
    }

    public Transcation getTransaction() {
        return transaction;
    }

    public void setTransaction(Transcation transaction) {
        this.transaction = transaction;
    }

    public String getCommodity() {
        return commodity;
    }

    public void setCommodity(String commodity) {
        this.commodity = commodity;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public SupplyChainStatus getStatus() {
        return status;
    }

    public void setStatus(SupplyChainStatus status) {
        this.status = status;
    }

    public String getCurrentLocation() {
        return currentLocation;
    }

    public void setCurrentLocation(String currentLocation) {
        this.currentLocation = currentLocation;
    }

    public String getOriginLocation() {
        return originLocation;
    }

    public void setOriginLocation(String originLocation) {
        this.originLocation = originLocation;
    }

    public String getDestinationLocation() {
        return destinationLocation;
    }

    public void setDestinationLocation(String destinationLocation) {
        this.destinationLocation = destinationLocation;
    }

    public String getBatchNumber() {
        return batchNumber;
    }

    public void setBatchNumber(String batchNumber) {
        this.batchNumber = batchNumber;
    }

    public List<SupplyChainCheckpoint> getCheckpoints() {
        return checkpoints;
    }

    public void setCheckpoints(List<SupplyChainCheckpoint> checkpoints) {
        this.checkpoints = checkpoints;
    }

    public LocalDateTime getHarvestedAt() {
        return harvestedAt;
    }

    public void setHarvestedAt(LocalDateTime harvestedAt) {
        this.harvestedAt = harvestedAt;
    }

    public LocalDateTime getProcessedAt() {
        return processedAt;
    }

    public void setProcessedAt(LocalDateTime processedAt) {
        this.processedAt = processedAt;
    }

    public LocalDateTime getShippedAt() {
        return shippedAt;
    }

    public void setShippedAt(LocalDateTime shippedAt) {
        this.shippedAt = shippedAt;
    }

    public LocalDateTime getDeliveredAt() {
        return deliveredAt;
    }

    public void setDeliveredAt(LocalDateTime deliveredAt) {
        this.deliveredAt = deliveredAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
