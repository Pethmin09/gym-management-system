package com.gymsystem.gymbackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.DiscriminatorValue;

@Entity
@DiscriminatorValue("CARD") // Matches the DiscriminatorColumn in Payment.java
public class CardPayment extends Payment {

    private String transactionRef;


    public CardPayment() {
        super();
    }

    public CardPayment(String paymentId, String memberId, double amount, String dueDate, String paidDate, String status, String transactionRef) {
        super(paymentId, memberId, amount, dueDate, paidDate, status);
        this.transactionRef = transactionRef;
    }

    @Override
    public String getPaymentType() {
        return "CARD";
    }

    public String getTransactionRef() {
        return transactionRef;
    }

    public void setTransactionRef(String transactionRef) {
        this.transactionRef = transactionRef;
    }
}