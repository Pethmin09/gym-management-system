package com.gymsystem.gymbackend.controller;


import com.gymsystem.gymbackend.entity.CashPayment;
import com.gymsystem.gymbackend.entity.CardPayment;
import com.gymsystem.gymbackend.entity.Payment;
import com.gymsystem.gymbackend.repository.PaymentRepository;
import com.gymsystem.gymbackend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @GetMapping("/history")
    public String viewHistory(Model model) {

        List<Payment> list = paymentRepository.findAll();

        LocalDate today = LocalDate.now();

        for (Payment p : list) {

            if (p.getPaymentDate() != null && !p.getPaymentDate().equals("N/A")) {
                p.setStatus("Paid");

            } else {
                LocalDate due = LocalDate.parse(p.getDueDate());

                if (today.isAfter(due)) {
                    p.setStatus("Overdue");
                } else {
                    p.setStatus("Pending");
                }
            }
        }

        model.addAttribute("paymentList", list);
        return "payment-history";
    }



    // 2. Load the entry form
    @GetMapping("/add")
    public String showAddPaymentForm() {
        return "payment-entry";
    }




    @PostMapping("/save")
    public String saveNewPayment(@RequestParam String type,
                                 @RequestParam String memberId,
                                 @RequestParam double amount,
                                 @RequestParam String dueDate,
                                 @RequestParam(required = false) String paymentDate,
                                 @RequestParam(required = false) String extraField) {


        String shortUuid = java.util.UUID.randomUUID()
                .toString()
                .substring(0, 5)
                .toUpperCase();

        String payId = "PAY-" + shortUuid;


        String finalDate = (paymentDate == null || paymentDate.trim().isEmpty())
                ? "N/A"
                : paymentDate;


        String status;

        if (!finalDate.equals("N/A")) {

            status = "Paid";

        } else {

            try {
                LocalDate today = LocalDate.now();
                LocalDate due = LocalDate.parse(dueDate);

                if (today.isAfter(due)) {
                    status = "Overdue";

                } else {
                    status = "Pending";
                }

            } catch (Exception e) {
                status = "Pending";
            }
        }

        Payment newPay;

        if ("CARD".equalsIgnoreCase(type)) {

            newPay = new CardPayment(
                    payId,
                    memberId,
                    amount,
                    dueDate,
                    finalDate,
                    status,
                    extraField
            );

        } else {

            double cashReceived;

            try {
                cashReceived = (extraField != null && !extraField.trim().isEmpty())
                        ? Double.parseDouble(extraField)
                        : amount;

            } catch (NumberFormatException e) {
                cashReceived = amount;
            }

            newPay = new CashPayment(
                    payId,
                    memberId,
                    amount,
                    dueDate,
                    finalDate,
                    status,
                    cashReceived
            );
        }

        paymentRepository.save(newPay);

        return "redirect:/payments/history";
    }







    @GetMapping("/edit/{id}")
    public String showEditPage(@PathVariable String id, Model model) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found: " + id));
        model.addAttribute("payment", payment);
        return "edit-payment";
    }


    @PostMapping("/update")
    public String updatePayment(@RequestParam String paymentId,
                                @RequestParam String dueDate,
                                @RequestParam(required = false) String paymentDate,
                                @RequestParam(required = false) String extraField) {

        // Fetch using the variable name 'existing'
        Payment existing = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        existing.setDueDate(dueDate);
        String finalDate = (paymentDate == null || paymentDate.trim().isEmpty()) ? "N/A" : paymentDate;
        existing.setPaymentDate(finalDate);


        if (!finalDate.equals("N/A")) {
            existing.setStatus("Paid");
        } else {
            LocalDate today = LocalDate.now();
            LocalDate due = LocalDate.parse(dueDate);

            if (today.isAfter(due)) {
                existing.setStatus("Overdue");
            } else {
                existing.setStatus("Pending");
            }
        }

        // Handle Sub-classes (Casting) to prevent NULL in MySQL
        if (existing instanceof CashPayment) {
            CashPayment cash = (CashPayment) existing;
            if (extraField != null && !extraField.isEmpty()) {
                cash.setAmountReceived(Double.parseDouble(extraField));
            }
        } else if (existing instanceof CardPayment) {
            CardPayment card = (CardPayment) existing;
            card.setTransactionRef(extraField);
        }

        paymentRepository.save(existing);
        return "redirect:/payments/history";
    }


    @GetMapping("/billing/{id}")
    public String showInvoice(@PathVariable String id, Model model) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
        model.addAttribute("payment", payment);
        return "billing";
    }

    @GetMapping("/delete/{id}")
    public String deletePayment(@PathVariable String id) {
        paymentRepository.deleteById(id);
        return "redirect:/payments/history";
    }

    @GetMapping("/search")
    public String searchMember(@RequestParam String memberId, Model model) {
        List<Payment> results = paymentRepository.findByMemberId(memberId);
        model.addAttribute("paymentList", results);


        model.addAttribute("searchQuery", memberId);

        return "payment-history";
    }
}