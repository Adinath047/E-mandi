package com.emandi.emandi_backend.service;
import com.emandi.emandi_backend.entity.*;
import com.emandi.emandi_backend.repository.*;
import com.emandi.emandi_backend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class SupplyChainService {

    @Autowired
    private SupplyChainRecordRepository supplyChainRecordRepository;

    @Autowired
    private SupplyChainCheckpointRepository checkpointRepository;

    @Transactional
    public SupplyChainRecord createSupplyChainRecord(Transcation transaction) {
        SupplyChainRecord record = new SupplyChainRecord();
        record.setTrackingId(generateTrackingId());
        record.setFarmer(transaction.getFromUser());
        record.setBuyer(transaction.getToUser());
        record.setTransaction(transaction);
        record.setCommodity(transaction.getCommodity());
        record.setQuantity(transaction.getQuantity());
        record.setUnit(transaction.getUnit());
        record.setOriginLocation(transaction.getFromUser().getState() + ", " +
                transaction.getFromUser().getDistrict());
        record.setDestinationLocation(transaction.getToUser().getState() + ", " +
                transaction.getToUser().getDistrict());
        record.setHarvestedAt(LocalDateTime.now());
        record.setBatchNumber(generateBatchNumber());

        SupplyChainRecord savedRecord = supplyChainRecordRepository.save(record);

        // Create initial checkpoint
        createCheckpoint(savedRecord, "Farm Location", "Commodity harvested and ready for shipment",
                SupplyChainCheckpoint.CheckpointType.HARVEST, transaction.getFromUser().getFullName());

        return savedRecord;
    }

    @Transactional
    public SupplyChainCheckpoint addCheckpoint(Long recordId, String location, String description,
                                               SupplyChainCheckpoint.CheckpointType type, String updatedBy) {
        SupplyChainRecord record = supplyChainRecordRepository.findById(recordId)
                .orElseThrow(() -> new ResourceNotFoundException("Supply chain record not found"));

        return createCheckpoint(record, location, description, type, updatedBy);
    }

    private SupplyChainCheckpoint createCheckpoint(SupplyChainRecord record, String location,
                                                   String description, SupplyChainCheckpoint.CheckpointType type,
                                                   String updatedBy) {
        SupplyChainCheckpoint checkpoint = new SupplyChainCheckpoint();
        checkpoint.setSupplyChainRecord(record);
        checkpoint.setLocation(location);
        checkpoint.setDescription(description);
        checkpoint.setCheckpointType(type);
        checkpoint.setUpdatedBy(updatedBy);

        return checkpointRepository.save(checkpoint);
    }

    @Transactional
    public SupplyChainRecord updateStatus(Long recordId, SupplyChainRecord.SupplyChainStatus status) {
        SupplyChainRecord record = supplyChainRecordRepository.findById(recordId)
                .orElseThrow(() -> new ResourceNotFoundException("Supply chain record not found"));

        record.setStatus(status);

        // Update timestamps based on status
        switch (status) {
            case PROCESSED:
                record.setProcessedAt(LocalDateTime.now());
                break;
            case SHIPPED:
                record.setShippedAt(LocalDateTime.now());
                break;
            case DELIVERED:
                record.setDeliveredAt(LocalDateTime.now());
                break;
        }

        return supplyChainRecordRepository.save(record);
    }

    public SupplyChainRecord getByTrackingId(String trackingId) {
        return supplyChainRecordRepository.findByTrackingId(trackingId)
                .orElseThrow(() -> new ResourceNotFoundException("Supply chain record not found"));
    }

    public List<SupplyChainRecord> getUserSupplyChainRecords(Long userId) {
        return supplyChainRecordRepository.findUserSupplyChainRecords(userId);
    }

    public List<SupplyChainRecord> getRecordsByCommodity(String commodity) {
        return supplyChainRecordRepository.findByCommodity(commodity);
    }

    private String generateTrackingId() {
        return "SC" + System.currentTimeMillis() + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }

    private String generateBatchNumber() {
        return "B" + System.currentTimeMillis();
    }
}
