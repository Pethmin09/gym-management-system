package com.gymsystem.gymbackend.service;

import com.gymsystem.gymbackend.entity.CardPayment;
import com.gymsystem.gymbackend.entity.CashPayment;
import com.gymsystem.gymbackend.entity.Payment;
import com.gymsystem.gymbackend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;



    public List<Payment> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        LocalDate today = LocalDate.now();

        for (Payment p : payments) {

            if (p.getStatus() != null && !p.getStatus().equalsIgnoreCase("Paid")) {
                try {
                    LocalDate dueDate = LocalDate.parse(p.getDueDate());
                    if (today.isAfter(dueDate)) {
                        p.setStatus("Overdue");
                    } else {
                        p.setStatus("Pending");
                    }
                } catch (Exception e) {
                    p.setStatus("Pending");
                }
            }
        }
        return payments;
    }



    public void addPayment(Payment payment) {
        if (payment.getAmount() <= 0) {
            throw new IllegalArgumentException("Payment amount must be positive.");
        }
        paymentRepository.save(payment);
    }

    public void deletePayment(String paymentId) {
        if (paymentRepository.existsById(paymentId)) {
            paymentRepository.deleteById(paymentId);
        }
    }

    public List<Payment> getPaymentsByMember(String memberId) {
        return paymentRepository.findByMemberId(memberId);
    }


    public void updatePayment(String id, String newDueDate, String newPaidDate, String extraField) {
        Optional<Payment> optionalPayment = paymentRepository.findById(id);

        if (optionalPayment.isPresent()) {
            Payment p = optionalPayment.get();
            LocalDate today = LocalDate.now();

            p.setDueDate(newDueDate);
            String finalPaidDate = (newPaidDate == null || newPaidDate.trim().isEmpty()) ? "N/A" : newPaidDate;
            p.setPaymentDate(finalPaidDate);


            if (!"N/A".equals(finalPaidDate)) {
                p.setStatus("Paid");
            } else {
                try {
                    LocalDate dueDate = LocalDate.parse(newDueDate);
                    p.setStatus(today.isAfter(dueDate) ? "Overdue" : "Pending");
                } catch (Exception e) {
                    p.setStatus("Pending");
                }
            }


            if (p instanceof CashPayment) {
                CashPayment cash = (CashPayment) p;
                if (extraField != null && !extraField.isEmpty()) {
                    cash.setAmountReceived(Double.parseDouble(extraField));
                }
            } else if (p instanceof CardPayment) {
                CardPayment card = (CardPayment) p;
                if (extraField != null && !extraField.isEmpty()) {
                    card.setTransactionRef(extraField);
                }
            }


            paymentRepository.save(p);
        }
    }
}