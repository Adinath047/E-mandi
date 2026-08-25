package com.emandi.emandi_backend.controller;

import com.emandi.emandi_backend.entity.SupplyChainRecord;
import com.emandi.emandi_backend.entity.SupplyChainCheckpoint;
import com.emandi.emandi_backend.service.SupplyChainService;
import com.emandi.emandi_backend.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/supply-chain")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SupplyChainController {

    @Autowired
    private SupplyChainService supplyChainService;

    @GetMapping("/track/{trackingId}")
    public ResponseEntity<ApiResponse<SupplyChainRecord>> trackCommodity(@PathVariable String trackingId) {
        try {
            SupplyChainRecord record = supplyChainService.getByTrackingId(trackingId);
            return ResponseEntity.ok(ApiResponse.success(record, "Supply chain record fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to fetch supply chain record: " + e.getMessage()));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<SupplyChainRecord>>> getUserSupplyChainRecords(@PathVariable Long userId) {
        try {
            List<SupplyChainRecord> records = supplyChainService.getUserSupplyChainRecords(userId);
            return ResponseEntity.ok(ApiResponse.success(records, "User supply chain records fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to fetch user supply chain records: " + e.getMessage()));
        }
    }

    @GetMapping("/commodity/{commodity}")
    public ResponseEntity<ApiResponse<List<SupplyChainRecord>>> getRecordsByCommodity(@PathVariable String commodity) {
        try {
            List<SupplyChainRecord> records = supplyChainService.getRecordsByCommodity(commodity);
            return ResponseEntity.ok(ApiResponse.success(records, "Commodity records fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to fetch commodity records: " + e.getMessage()));
        }
    }

    @PostMapping("/{recordId}/checkpoint")
    public ResponseEntity<ApiResponse<SupplyChainCheckpoint>> addCheckpoint(
            @PathVariable Long recordId,
            @RequestParam String location,
            @RequestParam String description,
            @RequestParam SupplyChainCheckpoint.CheckpointType type,
            @RequestParam String updatedBy) {
        try {
            SupplyChainCheckpoint checkpoint = supplyChainService.addCheckpoint(recordId, location, description, type, updatedBy);
            return ResponseEntity.ok(ApiResponse.success(checkpoint, "Checkpoint added successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to add checkpoint: " + e.getMessage()));
        }
    }

    @PutMapping("/{recordId}/status")
    public ResponseEntity<ApiResponse<SupplyChainRecord>> updateStatus(
            @PathVariable Long recordId,
            @RequestParam SupplyChainRecord.SupplyChainStatus status) {
        try {
            SupplyChainRecord record = supplyChainService.updateStatus(recordId, status);
            return ResponseEntity.ok(ApiResponse.success(record, "Supply chain status updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to update supply chain status: " + e.getMessage()));
        }
    }
}

