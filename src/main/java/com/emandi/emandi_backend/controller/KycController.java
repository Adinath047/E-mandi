package com.emandi.emandi_backend.controller;
import com.emandi.emandi_backend.entity.KycDocument;
import com.emandi.emandi_backend.service.KycService;
import com.emandi.emandi_backend.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/kyc")
@CrossOrigin(origins = "*", maxAge = 3600)
public class KycController {

    @Autowired
    private KycService kycService;

    @PostMapping("/{userId}/upload-aadhaar")
    public ResponseEntity<ApiResponse<KycDocument>> uploadAadhaarDocument(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file) {
        try {
            KycDocument kycDocument = kycService.uploadAadhaarDocument(userId, file);
            return ResponseEntity.ok(ApiResponse.success(kycDocument, "Aadhaar document uploaded successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to upload Aadhaar document: " + e.getMessage()));
        }
    }

    @PostMapping("/{userId}/upload-pan")
    public ResponseEntity<ApiResponse<KycDocument>> uploadPanDocument(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file) {
        try {
            KycDocument kycDocument = kycService.uploadPanDocument(userId, file);
            return ResponseEntity.ok(ApiResponse.success(kycDocument, "PAN document uploaded successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to upload PAN document: " + e.getMessage()));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<KycDocument>> getKycDocument(@PathVariable Long userId) {
        try {
            KycDocument kycDocument = kycService.getKycDocumentByUserId(userId);
            return ResponseEntity.ok(ApiResponse.success(kycDocument, "KYC document fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to fetch KYC document: " + e.getMessage()));
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<ApiResponse<List<KycDocument>>> getPendingKycDocuments() {
        try {
            List<KycDocument> kycDocuments = kycService.getPendingKycDocuments();
            return ResponseEntity.ok(ApiResponse.success(kycDocuments, "Pending KYC documents fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to fetch pending KYC documents: " + e.getMessage()));
        }
    }

    @PostMapping("/{kycId}/verify-aadhaar")
    public ResponseEntity<ApiResponse<KycDocument>> verifyAadhaar(
            @PathVariable Long kycId,
            @RequestParam boolean approved,
            @RequestParam String verifiedBy,
            @RequestParam(required = false) String remarks) {
        try {
            KycDocument kycDocument = kycService.verifyAadhaar(kycId, approved, verifiedBy, remarks);
            return ResponseEntity.ok(ApiResponse.success(kycDocument, "Aadhaar verification completed"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to verify Aadhaar: " + e.getMessage()));
        }
    }

    @PostMapping("/{kycId}/verify-pan")
    public ResponseEntity<ApiResponse<KycDocument>> verifyPan(
            @PathVariable Long kycId,
            @RequestParam boolean approved,
            @RequestParam String verifiedBy,
            @RequestParam(required = false) String remarks) {
        try {
            KycDocument kycDocument = kycService.verifyPan(kycId, approved, verifiedBy, remarks);
            return ResponseEntity.ok(ApiResponse.success(kycDocument, "PAN verification completed"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to verify PAN: " + e.getMessage()));
        }
    }
}