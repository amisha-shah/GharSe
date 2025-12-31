package com.tcet.gharse.mapper;

import com.tcet.gharse.dto.ProviderResponseDTO;
import com.tcet.gharse.entity.ProviderProfile;

public class ProviderMapper {

    public static ProviderResponseDTO toResponseDTO(ProviderProfile p) {
        ProviderResponseDTO dto = new ProviderResponseDTO();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setPhone(p.getPhone());
        dto.setWhatsapp(p.getWhatsapp());
        dto.setLatitude(p.getLatitude());
        dto.setLongitude(p.getLongitude());
        return dto;
    }
}
