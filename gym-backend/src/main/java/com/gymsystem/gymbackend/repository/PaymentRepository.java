package com.gymsystem.gymbackend.repository;

import com.gymsystem.gymbackend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {

    List<Payment> findByMemberId(String memberId);
}






















