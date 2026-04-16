package com.gymsystem.gymbackend.controller;

import com.gymsystem.gymbackend.entity.Member;
import com.gymsystem.gymbackend.service.MemberService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return memberService.getAllMembers();
    }

    @GetMapping("/{id}")
    public Member getMemberById(@PathVariable Integer id) {
        return memberService.getMemberById(id)
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + id));
    }

    @PostMapping
    public Member createMember(@RequestBody Member member) {
        return memberService.saveMember(member);
    }

    @PutMapping("/{id}")
    public Member updateMember(@PathVariable Integer id, @RequestBody Member member) {
        return memberService.updateMember(id, member);
    }

    @DeleteMapping("/{id}")
    public String deleteMember(@PathVariable Integer id) {
        memberService.deleteMember(id);
        return "Member deleted successfully";
    }
}