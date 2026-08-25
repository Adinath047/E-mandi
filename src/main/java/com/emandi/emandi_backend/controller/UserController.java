package com.emandi.emandi_backend.controller;

import com.emandi.emandi_backend.entity.User;
import com.emandi.emandi_backend.service.UserService;
import com.emandi.emandi_backend.dto.UserRegistractionDto;
import com.emandi.emandi_backend.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> registerUser(@Valid @RequestBody UserRegistractionDto registrationDto) {
        try {
            User user = userService.registerUser(registrationDto);
            return ResponseEntity.ok(ApiResponse.success(user, "User registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Registration failed: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(ApiResponse.success(users, "Users fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to fetch users: " + e.getMessage()));
        }
    }

    @GetMapping("/farmers")
    public ResponseEntity<ApiResponse<List<User>>> getFarmers() {
        try {
            List<User> farmers = userService.getUsersByType(User.UserType.FARMER);
            return ResponseEntity.ok(ApiResponse.success(farmers, "Farmers fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to fetch farmers: " + e.getMessage()));
        }
    }

    @GetMapping("/buyers")
    public ResponseEntity<ApiResponse<List<User>>> getBuyers() {
        try {
            List<User> buyers = userService.getUsersByType(User.UserType.BUYER);
            return ResponseEntity.ok(ApiResponse.success(buyers, "Buyers fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to fetch buyers: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable Long id) {
        try {
            User user = userService.findById(id);
            return ResponseEntity.ok(ApiResponse.success(user, "User fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to fetch user: " + e.getMessage()));
        }
    }

    @GetMapping("/pending-verification")
    public ResponseEntity<ApiResponse<List<User>>> getPendingVerificationUsers() {
        try {
            List<User> users = userService.getUsersByVerificationStatus(User.VerificationStatus.PENDING);
            return ResponseEntity.ok(ApiResponse.success(users, "Pending users fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to fetch pending users: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}/verification-status")
    public ResponseEntity<ApiResponse<User>> updateVerificationStatus(
            @PathVariable Long id,
            @RequestParam User.VerificationStatus status) {
        try {
            User user = userService.updateVerificationStatus(id, status);
            return ResponseEntity.ok(ApiResponse.success(user, "Verification status updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to update verification status: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> deactivateUser(@PathVariable Long id) {
        try {
            User user = userService.deactivateUser(id);
            return ResponseEntity.ok(ApiResponse.success(user, "User deactivated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to deactivate user: " + e.getMessage()));
        }
    }
}