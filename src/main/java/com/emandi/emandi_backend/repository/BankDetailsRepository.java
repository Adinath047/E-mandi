package com.emandi.emandi_backend.repository;

import com.emandi.emandi_backend.entity.BankDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface BankDetailsRepository extends JpaRepository<BankDetails, Long> {
    Optional<BankDetails> findByUserId(Long userId);
    List<BankDetails> findByVerificationStatus(BankDetails.VerificationStatus status);
    boolean existsByAccountNumber(String accountNumber);
}