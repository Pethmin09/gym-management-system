package com.gymsystem.gymbackend.service;

import com.gymsystem.gymbackend.entity.Equipment;
import com.gymsystem.gymbackend.repository.EquipmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;

    public EquipmentService(EquipmentRepository equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }

    public Equipment createEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    public Equipment getEquipmentById(Long id) {
        return equipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipment not found with id: " + id));
    }

    public Equipment updateEquipment(Long id, Equipment updatedEquipment) {
        Equipment existingEquipment = getEquipmentById(id);

        existingEquipment.setEquipmentName(updatedEquipment.getEquipmentName());
        existingEquipment.setPurchaseDate(updatedEquipment.getPurchaseDate());
        existingEquipment.setStatus(updatedEquipment.getStatus());
        existingEquipment.setQuantity(updatedEquipment.getQuantity());
        existingEquipment.setPrice(updatedEquipment.getPrice());
        existingEquipment.setImageUrl(updatedEquipment.getImageUrl());

        return equipmentRepository.save(existingEquipment);
    }

    public void deleteEquipment(Long id) {
        Equipment equipment = getEquipmentById(id);
        equipmentRepository.delete(equipment);
    }
}