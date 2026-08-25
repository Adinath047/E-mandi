package com.emandi.emandi_backend.service;

import com.emandi.emandi_backend.entity.*;
import com.emandi.emandi_backend.repository.*;
import com.emandi.emandi_backend.dto.UserRegistractionDto;
import com.emandi.emandi_backend.exception.ResourceNotFoundException;
import com.emandi.emandi_backend.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private KycDocumentRepository kycDocumentRepository;

    @Autowired
    private BankDetailsRepository bankDetailsRepository;

    @Autowired
    private FarmerProfileRepository farmerProfileRepository;

    @Autowired
    private BuyerProfileRepository buyerProfileRepository;

    @Autowired
    private BlockchainService blockchainService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User registerUser(UserRegistractionDto registrationDto) {
        // Validate unique constraints
        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new BadRequestException("User with this email already exists");
        }

        if (userRepository.existsByPhoneNumber(registrationDto.getPhoneNumber())) {
            throw new BadRequestException("User with this phone number already exists");
        }

        if (kycDocumentRepository.existsByAadhaarNumber(registrationDto.getAadhaarNumber())) {
            throw new BadRequestException("Aadhaar number already registered");
        }

        if (kycDocumentRepository.existsByPanNumber(registrationDto.getPanNumber())) {
            throw new BadRequestException("PAN number already registered");
        }

        // Create user
        User user = createUserEntity(registrationDto);
        User savedUser = userRepository.save(user);

        // Create associated entities
        createKycDocument(savedUser, registrationDto);
        createBankDetails(savedUser, registrationDto);

        if (registrationDto.getUserType() == User.UserType.FARMER) {
            createFarmerProfile(savedUser, registrationDto);
        } else {
            createBuyerProfile(savedUser, registrationDto);
        }

        // Create blockchain wallet
        blockchainService.createWalletForUser(savedUser);

        // Send welcome email
        emailService.sendWelcomeEmail(savedUser);

        return savedUser;
    }

    private User createUserEntity(UserRegistractionDto dto) {
        User user = new User();
        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setUserType(dto.getUserType());
        user.setState(dto.getState());
        user.setDistrict(dto.getDistrict());
        user.setAddress(dto.getAddress());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        return user;
    }

    private void createKycDocument(User user, UserRegistractionDto dto) {
        KycDocument kycDocument = new KycDocument();
        kycDocument.setUser(user);
        kycDocument.setAadhaarNumber(dto.getAadhaarNumber());
        kycDocument.setPanNumber(dto.getPanNumber());
        kycDocumentRepository.save(kycDocument);
    }

    private void createBankDetails(User user, UserRegistractionDto dto) {
        BankDetails bankDetails = new BankDetails();
        bankDetails.setUser(user);
        bankDetails.setBankName(dto.getBankName());
        bankDetails.setAccountHolderName(dto.getAccountHolderName());
        bankDetails.setAccountNumber(dto.getAccountNumber());
        bankDetails.setIfscCode(dto.getIfscCode());
        bankDetailsRepository.save(bankDetails);
    }

    private void createFarmerProfile(User user, UserRegistractionDto dto) {
        FarmerProfile farmerProfile = new FarmerProfile();
        farmerProfile.setUser(user);
        farmerProfile.setFarmSize(dto.getFarmSize());
        farmerProfile.setFarmingExperience(dto.getFarmingExperience());
        farmerProfile.setPrimaryCommodities(dto.getPrimaryCommodities());
        farmerProfile.setFarmType(dto.getFarmType());
        farmerProfile.setOrganicCertified(dto.getOrganicCertified());
        farmerProfileRepository.save(farmerProfile);
    }

    private void createBuyerProfile(User user, UserRegistractionDto dto) {
        BuyerProfile buyerProfile = new BuyerProfile();
        buyerProfile.setUser(user);
        buyerProfile.setCompanyName(dto.getCompanyName());
        buyerProfile.setBusinessType(dto.getBusinessType());
        buyerProfile.setGstNumber(dto.getGstNumber());
        buyerProfile.setCinNumber(dto.getCinNumber());
        buyerProfile.setInterestedCommodities(dto.getInterestedCommodities());
        buyerProfile.setYearsInBusiness(dto.getYearsInBusiness());
        buyerProfileRepository.save(buyerProfile);
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getUsersByType(User.UserType userType) {
        return userRepository.findByUserType(userType);
    }

    public List<User> getUsersByVerificationStatus(User.VerificationStatus status) {
        return userRepository.findByVerificationStatus(status);
    }

    public User updateVerificationStatus(Long userId, User.VerificationStatus status) {
        User user = findById(userId);
        user.setVerificationStatus(status);
        return userRepository.save(user);
    }

    public User deactivateUser(Long userId) {
        User user = findById(userId);
        user.setIsActive(false);
        return userRepository.save(user);
    }
}