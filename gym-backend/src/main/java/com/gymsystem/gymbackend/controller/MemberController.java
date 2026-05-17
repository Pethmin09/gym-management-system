package com.gymsystem.gymbackend.controller;

import com.gymsystem.gymbackend.entity.Member;
import com.gymsystem.gymbackend.service.MemberService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping
    public List<Member> getAllMembers() {
        List<Member> members = memberService.getAllMembers();
        return members;
    }

    @GetMapping("/{id}")
    public Member getMemberById(@PathVariable Integer id) {
        Optional<Member> optionalMember = memberService.getMemberById(id);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            return member;
        } else {
            throw new RuntimeException("Member not found with id: " + id);
        }
    }

    @PostMapping
    public Member createMember(@RequestBody Member member) {
        Member savedMember;
        savedMember = memberService.saveMember(member);
        return savedMember;
    }

    @PutMapping("/{id}")
    public Member updateMember(@PathVariable Integer id, @RequestBody Member member) {
        Member updatedMember;
        updatedMember = memberService.updateMember(id, member);
        return updatedMember;
    }

    @DeleteMapping("/{id}")
    public String deleteMember(@PathVariable Integer id) {
        String message;
        memberService.deleteMember(id);
        message = "Member deleted successfully";
        return message;
    }

    @PostMapping("/login")
    public Member loginMember(@RequestBody Member loginData) {

        String email;
        String password;
        Member loggedMember;

        email = loginData.getEmail();
        password = loginData.getPassword();

        loggedMember = memberService.loginMember(email, password);

        return loggedMember;
    }
}