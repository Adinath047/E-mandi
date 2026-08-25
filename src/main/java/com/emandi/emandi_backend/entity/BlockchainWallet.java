package com.emandi.emandi_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "blockchain_wallets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlockchainWallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(nullable = false, unique = true, length = 42)
    private String walletAddress;

    @Column(columnDefinition = "TEXT")
    private String encryptedPrivateKey;

    @Column(precision = 18, scale = 8)
    private BigDecimal balance = BigDecimal.ZERO;

    @Column(precision = 18, scale = 8)
    private BigDecimal escrowBalance = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    private WalletStatus status = WalletStatus.ACTIVE;

    private String networkType = "ETHEREUM";

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime lastTransactionAt;

    public enum WalletStatus {
        ACTIVE, SUSPENDED, BLOCKED
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

    public String getWalletAddress() {
        return walletAddress;
    }

    public void setWalletAddress(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    public String getEncryptedPrivateKey() {
        return encryptedPrivateKey;
    }

    public void setEncryptedPrivateKey(String encryptedPrivateKey) {
        this.encryptedPrivateKey = encryptedPrivateKey;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public BigDecimal getEscrowBalance() {
        return escrowBalance;
    }

    public void setEscrowBalance(BigDecimal escrowBalance) {
        this.escrowBalance = escrowBalance;
    }

    public WalletStatus getStatus() {
        return status;
    }

    public void setStatus(WalletStatus status) {
        this.status = status;
    }

    public String getNetworkType() {
        return networkType;
    }

    public void setNetworkType(String networkType) {
        this.networkType = networkType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getLastTransactionAt() {
        return lastTransactionAt;
    }

    public void setLastTransactionAt(LocalDateTime lastTransactionAt) {
        this.lastTransactionAt = lastTransactionAt;
    }
}
