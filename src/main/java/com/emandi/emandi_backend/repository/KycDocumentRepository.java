package com.emandi.emandi_backend.repository;

import com.emandi.emandi_backend.entity.KycDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface KycDocumentRepository extends JpaRepository<KycDocument, Long> {
    Optional<KycDocument> findByUserId(Long userId);
    List<KycDocument> findByAadhaarStatus(KycDocument.VerificationStatus status);
    List<KycDocument> findByPanStatus(KycDocument.VerificationStatus status);
    boolean existsByAadhaarNumber(String aadhaarNumber);
    boolean existsByPanNumber(String panNumber);
}
