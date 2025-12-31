package com.tcet.gharse.repository;

import com.tcet.gharse.entity.ProviderProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProviderProfileRepository
        extends JpaRepository<ProviderProfile, Long> {

    ProviderProfile findByUserId(Long userId);

    /*
    Uses the Haversine formula to calculate the great-circle distance between two points on
    Earth (given latitude and longitude).
    - 6371 = Earth's radius in kilometers
    - Filters Providers within the given radius (km)
    - Sorts results by nearest providers first
    Calculation done in SQL to avoid loading all Providers into memory.
     */
    @Query(value = """
            SELECT p.*,
            (6371 * acos(
                cos(radians(:lat)) *
                cos(radians(p.latitude)) *
                cos(radians(p.longitude) - radians(:lng)) +
                sin(radians(:lat)) *
                sin(radians(p.latitude))
            )) AS distance
            FROM provider_profile p
            WHERE p.active = true
              AND p.latitude IS NOT NULL
              AND p.longitude IS NOT NULL
            HAVING distance <= :radius
            ORDER BY distance
            """,
            nativeQuery = true)
    List<ProviderProfile> findNearbyProviders(
            @Param("lat") double lat,
            @Param("lng") double lng,
            @Param("radius") double radius
    );
}
