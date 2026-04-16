package com.gymsystem.gymbackend.service;

import com.gymsystem.gymbackend.entity.MembershipPlan;
import com.gymsystem.gymbackend.repository.MembershipPlanRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MembershipPlanService {

    private final MembershipPlanRepository membershipPlanRepository;

    public MembershipPlanService(MembershipPlanRepository membershipPlanRepository) {
        this.membershipPlanRepository = membershipPlanRepository;
    }

    public List<MembershipPlan> getAllPlans() {
        return membershipPlanRepository.findAll();
    }

    public Optional<MembershipPlan> getPlanById(Integer id) {
        return membershipPlanRepository.findById(id);
    }

    public MembershipPlan savePlan(MembershipPlan membershipPlan) {
        return membershipPlanRepository.save(membershipPlan);
    }

    public MembershipPlan updatePlan(Integer id, MembershipPlan updatedPlan) {
        return membershipPlanRepository.findById(id)
                .map(existingPlan -> {
                    existingPlan.setPlanName(updatedPlan.getPlanName());
                    existingPlan.setDurationMonths(updatedPlan.getDurationMonths());
                    existingPlan.setPrice(updatedPlan.getPrice());
                    existingPlan.setFeatures(updatedPlan.getFeatures());
                    return membershipPlanRepository.save(existingPlan);
                })
                .orElseThrow(() -> new RuntimeException("Membership plan not found with id: " + id));
    }

    public void deletePlan(Integer id) {
        membershipPlanRepository.deleteById(id);
    }
}