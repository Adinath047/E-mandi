package com.emandi.emandi_backend.controller;

import com.emandi.emandi_backend.entity.Transcation;
import com.emandi.emandi_backend.entity.BlockchainWallet;
import com.emandi.emandi_backend.service.BlockchainService;
import com.emandi.emandi_backend.dto.ApiResponse;
import com.emandi.emandi_backend.dto.TransactionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/blockchain")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BlockchainController {

    @Autowired
    private BlockchainService blockchainService;

    @GetMapping("/wallet/{userId}")
    public ResponseEntity<ApiResponse<BlockchainWallet>> getUserWallet(@PathVariable Long userId) {
        try {
            BlockchainWallet wallet = blockchainService.getUserWallet(userId);
            return ResponseEntity.ok(ApiResponse.success(wallet, "Wallet fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to fetch wallet: " + e.getMessage()));
        }
    }

    @GetMapping("/transactions/{userId}")
    public ResponseEntity<ApiResponse<List<Transcation>>> getUserTransactions(@PathVariable Long userId) {
        try {
            List<Transcation> transactions = blockchainService.getUserTransactions(userId);
            return ResponseEntity.ok(ApiResponse.success(transactions, "Transactions fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to fetch transactions: " + e.getMessage()));
        }
    }

    @GetMapping("/balance/{userId}")
    public ResponseEntity<ApiResponse<BigDecimal>> getUserBalance(@PathVariable Long userId) {
        try {
            BigDecimal balance = blockchainService.getUserBalance(userId);
            return ResponseEntity.ok(ApiResponse.success(balance, "Balance fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to fetch balance: " + e.getMessage()));
        }
    }

    @PostMapping("/transactions")
    public ResponseEntity<ApiResponse<Transcation>> createTransaction(@Valid @RequestBody TransactionDto transactionDto) {
        try {
            Transcation transaction = blockchainService.createTransaction(
                    transactionDto.getFromUserId(),
                    transactionDto.getToUserId(),
                    transactionDto.getAmount(),
                    transactionDto.getCommodity(),
                    transactionDto.getQuantity(),
                    transactionDto.getUnit()
            );
            return ResponseEntity.ok(ApiResponse.success(transaction, "Transaction created successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to create transaction: " + e.getMessage()));
        }
    }

    @PostMapping("/transactions/{transcationHash}/confirm")
    public ResponseEntity<ApiResponse<Transcation>> confirmTransaction(@PathVariable String transcationHash) {
        try {
            Transcation transaction = blockchainService.confirmTransaction(transcationHash);
            return ResponseEntity.ok(ApiResponse.success(transaction, "Transaction confirmed successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to confirm transaction: " + e.getMessage()));
        }
    }

    @PostMapping("/deposit/{userId}")
    public ResponseEntity<ApiResponse<Transcation>> depositToWallet(
            @PathVariable Long userId,
            @RequestParam BigDecimal amount) {
        try {
            Transcation transaction = blockchainService.depositToWallet(userId, amount);
            return ResponseEntity.ok(ApiResponse.success(transaction, "Deposit successful"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Deposit failed: " + e.getMessage()));
        }
    }
}
