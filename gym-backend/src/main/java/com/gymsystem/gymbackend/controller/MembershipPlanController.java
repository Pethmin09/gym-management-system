package com.gymsystem.gymbackend.controller;

import com.gymsystem.gymbackend.entity.MembershipPlan;
import com.gymsystem.gymbackend.service.MembershipPlanService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/membership-plans")
@CrossOrigin(origins = "http://localhost:5174")
public class MembershipPlanController {

    private final MembershipPlanService membershipPlanService;

    public MembershipPlanController(MembershipPlanService membershipPlanService) {
        this.membershipPlanService = membershipPlanService;
    }

    @GetMapping
    public List<MembershipPlan> getAllPlans() {
        return membershipPlanService.getAllPlans();
    }

    @GetMapping("/{id}")
    public MembershipPlan getPlanById(@PathVariable Integer id) {
        return membershipPlanService.getPlanById(id)
                .orElseThrow(() -> new RuntimeException("Membership plan not found with id: " + id));
    }

    @PostMapping
    public MembershipPlan createPlan(@RequestBody MembershipPlan membershipPlan) {
        return membershipPlanService.savePlan(membershipPlan);
    }

    @PutMapping("/{id}")
    public MembershipPlan updatePlan(@PathVariable Integer id, @RequestBody MembershipPlan membershipPlan) {
        return membershipPlanService.updatePlan(id, membershipPlan);
    }

    @DeleteMapping("/{id}")
    public String deletePlan(@PathVariable Integer id) {
        membershipPlanService.deletePlan(id);
        return "Membership plan deleted successfully";
    }
}