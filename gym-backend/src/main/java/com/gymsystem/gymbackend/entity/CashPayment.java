package com.gymsystem.gymbackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.DiscriminatorValue;

@Entity
@DiscriminatorValue("CASH")
public class CashPayment extends Payment {

    private double amountReceived;


    public CashPayment() {
        super();
    }

    public CashPayment(String paymentId, String memberId, double amount, String dueDate, String paidDate, String status, double amountReceived) {
        super(paymentId, memberId, amount, dueDate, paidDate, status);
        this.amountReceived = amountReceived;
    }

    @Override
    public String getPaymentType() {
        return "CASH";
    }

    public double getAmountReceived() {
        return amountReceived;
    }

    public void setAmountReceived(double amountReceived) {
        this.amountReceived = amountReceived;
    }
}