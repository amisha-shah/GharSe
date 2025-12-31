package com.tcet.gharse.service;

import com.tcet.gharse.entity.ProviderProfile;
import com.tcet.gharse.repository.ProviderProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProviderSearchService {

    @Autowired
    private ProviderProfileRepository repository;

    public List<ProviderProfile> search(double lat, double lng, double radius) {
        return repository.findNearbyProviders(lat, lng, radius);
    }
}
