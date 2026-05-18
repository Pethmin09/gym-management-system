package com.gymsystem.gymbackend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "trainers")
public non-sealed class Trainer extends Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainerId;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    private String specialization;
    private String workingHours;
    private double salary;
    private int experience;
    private String photoUrl;

    public Trainer() {
    }

    public Trainer(
            String fullName,
            String phone,
            String address,
            String gender,
            LocalDate dateOfBirth,
            String specialization,
            String workingHours,
            double salary,
            int experience,
            String photoUrl
    ) {
        super(fullName, phone, address, gender);
        this.dateOfBirth = dateOfBirth;
        this.specialization = specialization;
        this.workingHours = workingHours;
        this.salary = salary;
        this.experience = experience;
        this.photoUrl = photoUrl;
    }

    public Long getTrainerId() {
        return trainerId;
    }

    public void setTrainerId(Long trainerId) {
        this.trainerId = trainerId;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getSpecialization() {
        return specialization;
    }

    public String getWorkingHours() {
        return workingHours;
    }

    public double getSalary() {
        return salary;
    }

    public int getExperience() {
        return experience;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public void setWorkingHours(String workingHours) {
        this.workingHours = workingHours;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getTrainerSummary() {
        return getFullName() + " - " + specialization + " Coach";
    }

    @Override
    public String getRole() {
        return "Trainer";
    }
}