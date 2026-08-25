package com.emandi.emandi_backend.repository;

import com.emandi.emandi_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber(String phoneNumber);
    List<User> findByUserType(User.UserType userType);
    List<User> findByVerificationStatus(User.VerificationStatus status);
    List<User> findByStateAndDistrict(String state, String district);
    List<User> findByIsActiveTrue();
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);

    @Query("SELECT u FROM User u WHERE u.isActive = true AND u.verificationStatus = 'FULLY_VERIFIED'")
    List<User> findActiveVerifiedUsers();

    @Query("SELECT COUNT(u) FROM User u WHERE u.userType = :userType AND u.verificationStatus = 'FULLY_VERIFIED'")
    long countVerifiedUsersByType(@Param("userType") User.UserType userType);
}