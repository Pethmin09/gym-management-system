package com.gymsystem.gymbackend.service;

import com.gymsystem.gymbackend.entity.Member;
import com.gymsystem.gymbackend.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> getMemberById(Integer id) {
        return memberRepository.findById(id);
    }

    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }

    public Member updateMember(Integer id, Member updatedMember) {
        return memberRepository.findById(id)
                .map(existingMember -> {
                    existingMember.setFullName(updatedMember.getFullName());
                    existingMember.setPhone(updatedMember.getPhone());
                    existingMember.setAddress(updatedMember.getAddress());
                    existingMember.setGender(updatedMember.getGender());
                    existingMember.setEmail(updatedMember.getEmail());
                    existingMember.setPassword(updatedMember.getPassword());
                    existingMember.setDateOfBirth(updatedMember.getDateOfBirth());
                    return memberRepository.save(existingMember);
                })
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + id));
    }

    public void deleteMember(Integer id) {
        memberRepository.deleteById(id);
    }
}