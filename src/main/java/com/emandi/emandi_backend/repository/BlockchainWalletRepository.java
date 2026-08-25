package com.emandi.emandi_backend.repository;
import com.emandi.emandi_backend.entity.BlockchainWallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface BlockchainWalletRepository extends JpaRepository<BlockchainWallet, Long> {
    Optional<BlockchainWallet> findByUserId(Long userId);
    Optional<BlockchainWallet> findByWalletAddress(String walletAddress);
    List<BlockchainWallet> findByStatus(BlockchainWallet.WalletStatus status);
    boolean existsByWalletAddress(String walletAddress);
}