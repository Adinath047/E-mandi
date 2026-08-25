package com.emandi.emandi_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "supply_chain_checkpoints")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplyChainCheckpoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "supply_chain_record_id", nullable = false)
    private SupplyChainRecord supplyChainRecord;

    @Column(nullable = false, length = 200)
    private String location;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private CheckpointType checkpointType;

    @Column(length = 100)
    private String updatedBy;

    @CreationTimestamp
    @Column(name = "timestamp", nullable = false, updatable = false)
    private LocalDateTime timestamp;

    // Environmental tracking
    @Column(length = 10)
    private String temperature;

    @Column(length = 10)
    private String humidity;

    @Column(columnDefinition = "TEXT")
    private String qualityCheck;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    public enum CheckpointType {
        HARVEST, PROCESSING, PACKAGING, QUALITY_CHECK, SHIPPING, TRANSIT, DELIVERY
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SupplyChainRecord getSupplyChainRecord() {
        return supplyChainRecord;
    }

    public void setSupplyChainRecord(SupplyChainRecord supplyChainRecord) {
        this.supplyChainRecord = supplyChainRecord;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CheckpointType getCheckpointType() {
        return checkpointType;
    }

    public void setCheckpointType(CheckpointType checkpointType) {
        this.checkpointType = checkpointType;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getTemperature() {
        return temperature;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature;
    }

    public String getHumidity() {
        return humidity;
    }

    public void setHumidity(String humidity) {
        this.humidity = humidity;
    }

    public String getQualityCheck() {
        return qualityCheck;
    }

    public void setQualityCheck(String qualityCheck) {
        this.qualityCheck = qualityCheck;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
