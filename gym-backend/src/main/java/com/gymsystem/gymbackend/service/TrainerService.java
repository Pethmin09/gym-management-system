package com.gymsystem.gymbackend.service;

import com.gymsystem.gymbackend.entity.Trainer;
import com.gymsystem.gymbackend.repository.TrainerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerService {

    private final TrainerRepository trainerRepository;

    public TrainerService(TrainerRepository trainerRepository) {
        this.trainerRepository = trainerRepository;
    }

    public Trainer createTrainer(Trainer trainer) {
        return trainerRepository.save(trainer);
    }

    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    public Trainer getTrainerById(Long id) {
        return trainerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found with id: " + id));
    }

    public List<Trainer> getTrainersBySpecialization(String specialization) {
        return trainerRepository.findBySpecialization(specialization);
    }

    public Trainer updateTrainer(Long id, Trainer updatedTrainer) {
        Trainer existingTrainer = getTrainerById(id);

        existingTrainer.setFullName(updatedTrainer.getFullName());
        existingTrainer.setPhone(updatedTrainer.getPhone());
        existingTrainer.setAddress(updatedTrainer.getAddress());
        existingTrainer.setGender(updatedTrainer.getGender());
        existingTrainer.setDateOfBirth(updatedTrainer.getDateOfBirth());

        existingTrainer.setSpecialization(updatedTrainer.getSpecialization());
        existingTrainer.setWorkingHours(updatedTrainer.getWorkingHours());
        existingTrainer.setSalary(updatedTrainer.getSalary());
        existingTrainer.setExperience(updatedTrainer.getExperience());

        return trainerRepository.save(existingTrainer);
    }

    public void deleteTrainer(Long id) {
        Trainer existingTrainer = getTrainerById(id);
        trainerRepository.delete(existingTrainer);
    }
}