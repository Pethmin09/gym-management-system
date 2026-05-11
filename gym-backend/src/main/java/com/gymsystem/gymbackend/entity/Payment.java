package com.gymsystem.gymbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "payments")

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)

@DiscriminatorColumn(name = "payment_type", discriminatorType = DiscriminatorType.STRING)
public abstract class Payment {

    @Id
    private String paymentId;
    private String memberId;
    private double amount;
    private String dueDate;
    private String paymentDate;
    private String status;


    public Payment() {}


    public Payment(String paymentId, String memberId, double amount, String dueDate, String paymentDate, String status) {
        this.paymentId = paymentId;
        this.memberId = memberId;
        this.amount = amount;
        this.dueDate = dueDate;
        this.paymentDate = paymentDate;
        this.status = status;
    }


    @Transient
    public abstract String getPaymentType();

    // --- Getters and Setters ---

    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }

    public String getMemberId() { return memberId; }
    public void setMemberId(String memberId) { this.memberId = memberId; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getDueDate() { return dueDate; }
    public void setDueDate(String dueDate) { this.dueDate = dueDate; }

    public String getPaymentDate() { return paymentDate; }
    public void setPaymentDate(String paymentDate) { this.paymentDate = paymentDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}









