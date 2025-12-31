package com.tcet.gharse.controller;

import com.tcet.gharse.dto.ProviderResponseDTO;
import com.tcet.gharse.entity.ProviderProfile;
import com.tcet.gharse.entity.User;
import com.tcet.gharse.enums.Role;
import com.tcet.gharse.mapper.ProviderMapper;
import com.tcet.gharse.repository.ProviderProfileRepository;
import com.tcet.gharse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/provider")
public class ProviderProfileController {

    @Autowired
    private ProviderProfileRepository profileRepo;

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/profile/{userId}")
    public ProviderResponseDTO createOrUpdateProfile(
            @PathVariable Long userId,
            @RequestBody ProviderProfile profile
    ) {
        User user = userRepo.findById(userId).orElseThrow();

        if (user.getRole() != Role.PROVIDER) {
            throw new RuntimeException("Only PROVIDER users can create provider profiles");
        }

        ProviderProfile saved;

        ProviderProfile existing = profileRepo.findByUserId(userId);
        if (existing != null) {
            existing.setName(profile.getName());
            existing.setPhone(profile.getPhone());
            existing.setWhatsapp(profile.getWhatsapp());
            existing.setLatitude(profile.getLatitude());
            existing.setLongitude(profile.getLongitude());
            saved = profileRepo.save(existing);
        } else {
            profile.setUser(user);
            saved = profileRepo.save(profile);
        }

        return ProviderMapper.toResponseDTO(saved);
    }
}
