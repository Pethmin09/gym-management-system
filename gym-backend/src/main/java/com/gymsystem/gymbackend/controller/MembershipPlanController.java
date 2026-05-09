package com.gymsystem.gymbackend.controller;

import com.gymsystem.gymbackend.entity.MembershipPlan;
import com.gymsystem.gymbackend.repository.MembershipPlanRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/membership-plans")
@CrossOrigin(origins = "*")
public class MembershipPlanController {

    private final MembershipPlanRepository repository;

    public MembershipPlanController(MembershipPlanRepository repository) {
        this.repository = repository;
    }

    // GET all plans
    @GetMapping
    public List<MembershipPlan> getAllPlans() {
        return repository.findAll();
    }

    // GET plan by ID
    @GetMapping("/{id}")
    public ResponseEntity<MembershipPlan> getPlanById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST create new plan
    @PostMapping
    public MembershipPlan createPlan(@RequestBody MembershipPlan plan) {
        return repository.save(plan);
    }

    // PUT update existing plan
    @PutMapping("/{id}")
    public ResponseEntity<MembershipPlan> updatePlan(@PathVariable Long id, @RequestBody MembershipPlan planDetails) {
        return repository.findById(id)
                .map(existingPlan -> {
                    existingPlan.setPlanName(planDetails.getPlanName());
                    existingPlan.setDurationMonths(planDetails.getDurationMonths());
                    existingPlan.setPrice(planDetails.getPrice());
                    existingPlan.setFeatures(planDetails.getFeatures());
                    return ResponseEntity.ok(repository.save(existingPlan));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE plan
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
