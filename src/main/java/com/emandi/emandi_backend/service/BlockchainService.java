package com.emandi.emandi_backend.service;
import com.emandi.emandi_backend.entity.*;
import com.emandi.emandi_backend.repository.*;
import com.emandi.emandi_backend.exception.ResourceNotFoundException;
import com.emandi.emandi_backend.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.SecureRandom;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;

@Service
public class BlockchainService {

    @Autowired
    private BlockchainWalletRepository walletRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SupplyChainService supplyChainService;

    @Transactional
    public BlockchainWallet createWalletForUser(User user) {
        // Check if wallet already exists
        if (walletRepository.findByUserId(user.getId()).isPresent()) {
            throw new BadRequestException("Wallet already exists for this user");
        }

        String walletAddress = generateWalletAddress();
        String privateKey = generatePrivateKey();

        BlockchainWallet wallet = new BlockchainWallet();
        wallet.setUser(user);
        wallet.setWalletAddress(walletAddress);
        wallet.setEncryptedPrivateKey(encryptPrivateKey(privateKey));
        wallet.setBalance(BigDecimal.ZERO);

        return walletRepository.save(wallet);
    }

    @Transactional
    public Transcation createTransaction(Long fromUserId, Long toUserId, BigDecimal amount,
                                         String commodity, Double quantity, String unit) {
        User fromUser = userRepository.findById(fromUserId)
                .orElseThrow(() -> new ResourceNotFoundException("From user not found"));
        User toUser = userRepository.findById(toUserId)
                .orElseThrow(() -> new ResourceNotFoundException("To user not found"));

        // Validate wallet balances
        BlockchainWallet fromWallet = walletRepository.findByUserId(fromUserId)
                .orElseThrow(() -> new ResourceNotFoundException("From wallet not found"));

        if (fromWallet.getBalance().compareTo(amount) < 0) {
            throw new BadRequestException("Insufficient balance");
        }

        Transcation transaction = new Transcation();
        transaction.setTransactionHash(generateTransactionHash());
        transaction.setFromUser(fromUser);
        transaction.setToUser(toUser);
        transaction.setAmount(amount);
        transaction.setTransactionType(Transcation.TransactionType.PURCHASE);
        transaction.setCommodity(commodity);
        transaction.setQuantity(quantity);
        transaction.setUnit(unit);
        transaction.setPricePerUnit(amount.divide(BigDecimal.valueOf(quantity)));

        Transcation savedTransaction = transactionRepository.save(transaction);

        // Create supply chain record
        supplyChainService.createSupplyChainRecord(savedTransaction);

        return savedTransaction;
    }

    @Transactional
    public Transcation confirmTransaction(String transactionHash) {
        Transcation transaction = transactionRepository.findByTransactionHash(transactionHash)
                .orElseThrow(() -> new ResourceNotFoundException("Transcation not found"));

        if (transaction.getStatus() != Transcation.TransactionStatus.PENDING) {
            throw new BadRequestException("Transaction is not in pending state");
        }

// Update transaction details
        transaction.setStatus(Transcation.TransactionStatus.CONFIRMED);
        transaction.setConfirmedAt(LocalDateTime.now());
        transaction.setBlockNumber(generateBlockNumber());
        transaction.setGasUsed(21000);
        transaction.setGasFee(BigDecimal.valueOf(0.001));

// Save transaction
        Transcation savedTransaction = transactionRepository.save(transaction);

// ✅ Update wallet balances using the object
        updateWalletBalances(savedTransaction);

        return savedTransaction;

    }

    private void updateWalletBalances(Transcation transaction) {
        BlockchainWallet fromWallet = walletRepository.findByUserId(transaction.getFromUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("From wallet not found"));

        BlockchainWallet toWallet = walletRepository.findByUserId(transaction.getToUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("To wallet not found"));

        BigDecimal totalAmount = transaction.getAmount().add(transaction.getGasFee());
        fromWallet.setBalance(fromWallet.getBalance().subtract(totalAmount));
        fromWallet.setLastTransactionAt(LocalDateTime.now());

        toWallet.setBalance(toWallet.getBalance().add(transaction.getAmount()));
        toWallet.setLastTransactionAt(LocalDateTime.now());

        walletRepository.save(fromWallet);
        walletRepository.save(toWallet);
    }

    public BlockchainWallet getUserWallet(Long userId) {
        return walletRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found for user"));
    }

    public List<Transcation> getUserTransactions(Long userId) {
        return transactionRepository.findUserTransactions(userId);
    }

    public BigDecimal getUserBalance(Long userId) {
        BlockchainWallet wallet = getUserWallet(userId);
        return wallet.getBalance();
    }

    @Transactional
    public Transcation depositToWallet(Long userId, BigDecimal amount) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Transcation transaction = new Transcation();
        transaction.setTransactionHash(generateTransactionHash());
        transaction.setToUser(user);
        transaction.setAmount(amount);
        transaction.setTransactionType(Transcation.TransactionType.DEPOSIT);
        transaction.setStatus(Transcation.TransactionStatus.CONFIRMED);
        transaction.setConfirmedAt(LocalDateTime.now());

        Transcation savedTransaction = transactionRepository.save(transaction);

        // Update wallet balance
        BlockchainWallet wallet = getUserWallet(userId);
        wallet.setBalance(wallet.getBalance().add(amount));
        wallet.setLastTransactionAt(LocalDateTime.now());
        walletRepository.save(wallet);

        return savedTransaction;
    }

    private String generateWalletAddress() {
        return "0x" + UUID.randomUUID().toString().replace("-", "").substring(0, 40).toLowerCase();
    }

    private String generatePrivateKey() {
        SecureRandom random = new SecureRandom();
        byte[] privateKey = new byte[32];
        random.nextBytes(privateKey);
        return bytesToHex(privateKey);
    }

    private String generateTransactionHash() {
        return "0x" + UUID.randomUUID().toString().replace("-", "").toLowerCase();
    }

    private Long generateBlockNumber() {
        return System.currentTimeMillis() / 1000;
    }

    private String encryptPrivateKey(String privateKey) {
        // In production, implement proper encryption
        return privateKey;
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }
}