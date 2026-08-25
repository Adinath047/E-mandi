package com.emandi.emandi_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "kyc_documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class KycDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(nullable = false, unique = true, length = 12)
    private String aadhaarNumber;

    @Column(nullable = false, unique = true, length = 10)
    private String panNumber;

    private String aadhaarDocumentPath;
    private String panDocumentPath;

    @Enumerated(EnumType.STRING)
    private VerificationStatus aadhaarStatus = VerificationStatus.PENDING;

    @Enumerated(EnumType.STRING)
    private VerificationStatus panStatus = VerificationStatus.PENDING;

    private LocalDateTime verifiedAt;
    private String verifiedBy;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum VerificationStatus {
        PENDING, VERIFIED, REJECTED
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }

    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public String getAadhaarDocumentPath() {
        return aadhaarDocumentPath;
    }

    public void setAadhaarDocumentPath(String aadhaarDocumentPath) {
        this.aadhaarDocumentPath = aadhaarDocumentPath;
    }

    public String getPanDocumentPath() {
        return panDocumentPath;
    }

    public void setPanDocumentPath(String panDocumentPath) {
        this.panDocumentPath = panDocumentPath;
    }

    public VerificationStatus getAadhaarStatus() {
        return aadhaarStatus;
    }

    public void setAadhaarStatus(VerificationStatus aadhaarStatus) {
        this.aadhaarStatus = aadhaarStatus;
    }

    public VerificationStatus getPanStatus() {
        return panStatus;
    }

    public void setPanStatus(VerificationStatus panStatus) {
        this.panStatus = panStatus;
    }

    public LocalDateTime getVerifiedAt() {
        return verifiedAt;
    }

    public void setVerifiedAt(LocalDateTime verifiedAt) {
        this.verifiedAt = verifiedAt;
    }

    public String getVerifiedBy() {
        return verifiedBy;
    }

    public void setVerifiedBy(String verifiedBy) {
        this.verifiedBy = verifiedBy;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
