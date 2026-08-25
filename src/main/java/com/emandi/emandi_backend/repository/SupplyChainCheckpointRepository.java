package com.emandi.emandi_backend.repository;



import com.emandi.emandi_backend.entity.SupplyChainCheckpoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SupplyChainCheckpointRepository extends JpaRepository<SupplyChainCheckpoint, Long> {

    // Find checkpoints by SupplyChainRecord ID
    List<SupplyChainCheckpoint> findBySupplyChainRecordId(Long recordId);
}
