package com.gymsystem.gymbackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "membership_plans")
@Getter
@Setter
public class MembershipPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer planId;

    @Column(nullable = false)
    private String planName;

    @Column(nullable = false)
    private Integer durationMonths;

    @Column(nullable = false)
    private Double price;

    @Column(columnDefinition = "TEXT")
    private String features;
}