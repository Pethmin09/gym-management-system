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

        List<Member> members;

        members = memberRepository.findAll();

        return members;
    }

    public Optional<Member> getMemberById(Integer id) {

        Optional<Member> member;

        member = memberRepository.findById(id);

        return member;
    }

    public Member saveMember(Member member) {

        Member savedMember;

        savedMember = memberRepository.save(member);

        return savedMember;
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
                    existingMember.setMembershipPlan(updatedMember.getMembershipPlan());
                    return memberRepository.save(existingMember);
                })
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + id));
    }

    public void deleteMember(Integer id) {

        Optional<Member> optionalMember;

        optionalMember = memberRepository.findById(id);

        if (optionalMember.isPresent()) {

            memberRepository.deleteById(id);

        } else {

            throw new RuntimeException("Member not found with id: " + id);

        }
    }

    public Member loginMember(String email, String password) {

        Optional<Member> optionalMember;
        Member member;

        optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isPresent()) {

            member = optionalMember.get();

            if (member.getPassword().equals(password)) {

                return member;

            } else {

                throw new RuntimeException("Invalid password");

            }

        } else {

            throw new RuntimeException("Email not found");

        }
    }
}