package com.emandi.emandi_backend.repository;



import com.emandi.emandi_backend.entity.FarmerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FarmerProfileRepository extends JpaRepository<FarmerProfile, Long> {

    Optional<FarmerProfile> findByUserId(Long userId);

    List<FarmerProfile> findByOrganicCertifiedTrue();

    @Query("SELECT fp FROM FarmerProfile fp JOIN fp.primaryCommodities pc WHERE pc = :commodity")
    List<FarmerProfile> findByCommodity(@Param("commodity") String commodity);

    @Query("SELECT fp FROM FarmerProfile fp WHERE fp.user.state = :state AND fp.user.district = :district")
    List<FarmerProfile> findByLocation(@Param("state") String state, @Param("district") String district);
}

