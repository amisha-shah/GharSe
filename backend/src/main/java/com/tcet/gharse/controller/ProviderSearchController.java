package com.tcet.gharse.controller;

import com.tcet.gharse.dto.ProviderResponseDTO;
import com.tcet.gharse.entity.ProviderProfile;
import com.tcet.gharse.mapper.ProviderMapper;
import com.tcet.gharse.service.ProviderSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/providers")
public class ProviderSearchController {

    @Autowired
    private ProviderSearchService searchService;

    @GetMapping("/nearby")
    public List<ProviderResponseDTO> getNearbyProviders(
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(defaultValue = "5") double radius
    ) {
        List<ProviderProfile> providers =
                searchService.search(lat, lng, radius);

        return providers.stream()
                .map(ProviderMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}
