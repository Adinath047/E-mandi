package com.emandi.emandi_backend.service;
import com.emandi.emandi_backend.entity.KycDocument;
import com.emandi.emandi_backend.entity.User;
import com.emandi.emandi_backend.repository.KycDocumentRepository;
import com.emandi.emandi_backend.repository.UserRepository;
import com.emandi.emandi_backend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class KycService {

    @Autowired
    private KycDocumentRepository kycDocumentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private EmailService emailService;

    @Transactional
    public KycDocument uploadAadhaarDocument(Long userId, MultipartFile file) {
        KycDocument kycDocument = kycDocumentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("KYC document not found"));

        String filePath = fileStorageService.storeFile(file, "aadhaar", userId);
        kycDocument.setAadhaarDocumentPath(filePath);

        return kycDocumentRepository.save(kycDocument);
    }

    @Transactional
    public KycDocument uploadPanDocument(Long userId, MultipartFile file) {
        KycDocument kycDocument = kycDocumentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("KYC document not found"));

        String filePath = fileStorageService.storeFile(file, "pan", userId);
        kycDocument.setPanDocumentPath(filePath);

        return kycDocumentRepository.save(kycDocument);
    }

    @Transactional
    public KycDocument verifyAadhaar(Long kycId, boolean approved, String verifiedBy, String remarks) {
        KycDocument kycDocument = kycDocumentRepository.findById(kycId)
                .orElseThrow(() -> new ResourceNotFoundException("KYC document not found"));

        kycDocument.setAadhaarStatus(approved ?
                KycDocument.VerificationStatus.VERIFIED :
                KycDocument.VerificationStatus.REJECTED);
        kycDocument.setVerifiedBy(verifiedBy);
        kycDocument.setRemarks(remarks);

        if (approved && kycDocument.getPanStatus() == KycDocument.VerificationStatus.VERIFIED) {
            updateUserVerificationStatus(kycDocument.getUser(), User.VerificationStatus.KYC_VERIFIED);
        }

        KycDocument savedDocument = kycDocumentRepository.save(kycDocument);

        // Send notification email
        emailService.sendKycStatusEmail(kycDocument.getUser(), approved, "Aadhaar");

        return savedDocument;
    }

    @Transactional
    public KycDocument verifyPan(Long kycId, boolean approved, String verifiedBy, String remarks) {
        KycDocument kycDocument = kycDocumentRepository.findById(kycId)
                .orElseThrow(() -> new ResourceNotFoundException("KYC document not found"));

        kycDocument.setPanStatus(approved ?
                KycDocument.VerificationStatus.VERIFIED :
                KycDocument.VerificationStatus.REJECTED);
        kycDocument.setVerifiedBy(verifiedBy);
        kycDocument.setRemarks(remarks);

        if (approved && kycDocument.getAadhaarStatus() == KycDocument.VerificationStatus.VERIFIED) {
            updateUserVerificationStatus(kycDocument.getUser(), User.VerificationStatus.KYC_VERIFIED);
        }

        KycDocument savedDocument = kycDocumentRepository.save(kycDocument);

        // Send notification email
        emailService.sendKycStatusEmail(kycDocument.getUser(), approved, "PAN");

        return savedDocument;
    }

    private void updateUserVerificationStatus(User user, User.VerificationStatus status) {
        user.setVerificationStatus(status);
        userRepository.save(user);
    }

    public KycDocument getKycDocumentByUserId(Long userId) {
        return kycDocumentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("KYC document not found"));
    }

    public List<KycDocument> getPendingKycDocuments() {
        return kycDocumentRepository.findByAadhaarStatus(KycDocument.VerificationStatus.PENDING);
    }
}
