package com.emandi.emandi_backend.repository;

import com.emandi.emandi_backend.entity.SupplyChainRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SupplyChainRecordRepository extends JpaRepository<SupplyChainRecord, Long> {
    Optional<SupplyChainRecord> findByTrackingId(String trackingId);
    List<SupplyChainRecord> findByFarmerId(Long farmerId);
    List<SupplyChainRecord> findByBuyerId(Long buyerId);
    List<SupplyChainRecord> findByStatus(SupplyChainRecord.SupplyChainStatus status);
    List<SupplyChainRecord> findByCommodity(String commodity);

    @Query("SELECT sc FROM SupplyChainRecord sc WHERE sc.farmer.id = :userId OR sc.buyer.id = :userId ORDER BY sc.createdAt DESC")
    List<SupplyChainRecord> findUserSupplyChainRecords(@Param("userId") Long userId);
}
