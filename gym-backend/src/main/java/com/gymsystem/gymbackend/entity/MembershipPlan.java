package com.gymsystem.gymbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "membership_plans")
public class MembershipPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String planName;

    @Column(nullable = false)
    private Integer durationMonths;

    @Column(nullable = false)
    private Double price;

    @Column(columnDefinition = "TEXT")
    private String features;

    // Default Constructor
    public MembershipPlan() {
    }

    // Parameterized Constructor
    public MembershipPlan(String planName, Integer durationMonths, Double price, String features) {
        this.planName = planName;
        this.durationMonths = durationMonths;
        this.price = price;
        this.features = features;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public Integer getDurationMonths() {
        return durationMonths;
    }

    public void setDurationMonths(Integer durationMonths) {
        this.durationMonths = durationMonths;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getFeatures() {
        return features;
    }

    public void setFeatures(String features) {
        this.features = features;
    }
}
