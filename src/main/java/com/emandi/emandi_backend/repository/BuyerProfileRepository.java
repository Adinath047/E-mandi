package com.emandi.emandi_backend.repository;
import com.emandi.emandi_backend.entity.BuyerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BuyerProfileRepository extends JpaRepository<BuyerProfile, Long> {
    Optional<BuyerProfile> findByUserId(Long userId);
    List<BuyerProfile> findByBusinessType(BuyerProfile.BusinessType businessType);

    @Query("SELECT bp FROM BuyerProfile bp JOIN bp.interestedCommodities ic WHERE ic = :commodity")
    List<BuyerProfile> findByCommodityInterest(@Param("commodity") String commodity);

    @Query("SELECT bp FROM BuyerProfile bp WHERE bp.user.state = :state AND bp.user.district = :district")
    List<BuyerProfile> findByLocation(@Param("state") String state, @Param("district") String district);
}