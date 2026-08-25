package com.emandi.emandi_backend.dto;



import com.emandi.emandi_backend.entity.KycDocument;
import lombok.Data;

@Data
public class KycDocuments {
    private Long id;
    private Long userId;
    private String aadhaarNumber;
    private String panNumber;
    private String aadhaarDocumentPath;
    private String panDocumentPath;
    private KycDocument.VerificationStatus aadhaarStatus;
    private KycDocument.VerificationStatus panStatus;
    private String verifiedBy;
    private String remarks;
}
