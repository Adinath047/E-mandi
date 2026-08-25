package com.emandi.emandi_backend.repository;
import com.emandi.emandi_backend.entity.Transcation;
import com.emandi.emandi_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Repository
public interface TransactionRepository extends JpaRepository<Transcation, Long> {
    Optional<Transcation> findByTransactionHash(String transactionHash);
    List<Transcation> findByFromUserOrToUserOrderByCreatedAtDesc(User fromUser, User toUser);
    List<Transcation> findByStatusOrderByCreatedAtDesc(Transcation.TransactionStatus status);
    List<Transcation> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT t FROM Transcation t WHERE t.fromUser.id = :userId OR t.toUser.id = :userId ORDER BY t.createdAt DESC")
    List<Transcation> findUserTransactions(@Param("userId") Long userId);

    @Query("SELECT SUM(t.amount) FROM Transcation t WHERE t.toUser.id = :userId AND t.status = 'CONFIRMED'")
    BigDecimal getTotalReceivedAmount(@Param("userId") Long userId);

    @Query("SELECT SUM(t.amount) FROM Transcation t WHERE t.fromUser.id = :userId AND t.status = 'CONFIRMED'")
    BigDecimal getTotalSentAmount(@Param("userId") Long userId);
}
