package com.gymsystem.gymbackend.repository;

import com.gymsystem.gymbackend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {

    List<Payment> findByMemberId(String memberId);
}






















/*package com.gymsystem.gymbackend.repository;

import com.gymsystem.gymbackend.entity.*;
import org.springframework.stereotype.Repository;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class PaymentRepository {

    private final String FILE_NAME = "payments.txt";

    public List<Payment> loadAllPayments() {
        List<Payment> paymentList = new ArrayList<>();
        File dataFile = new File(FILE_NAME);

        if (!dataFile.exists()) {
            try {
                dataFile.createNewFile();
            } catch (IOException e) {
                System.out.println("Error creating data file: " + e.getMessage());
            }
            return paymentList;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(dataFile))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.trim().isEmpty()) continue;

                // split with -1 to capture empty trailing values
                String[] values = line.split(",", -1);
                if (values.length < 8) continue;

                String paymentId = values[0].trim();
                String memberId = values[1].trim();
                double amount = Double.parseDouble(values[2].trim());
                String dueDate = values[3].trim();
                String paymentDate = values[4].trim();
                String status = values[5].trim();
                String type = values[6].trim();
                String extraInfo = (values[7] == null || values[7].trim().isEmpty()) ? "N/A" : values[7].trim();

                if ("CASH".equalsIgnoreCase(type)) {
                    double amountReceived = extraInfo.equals("N/A") ? amount : Double.parseDouble(extraInfo);
                    paymentList.add(new CashPayment(paymentId, memberId, amount, dueDate, paymentDate, status, amountReceived));
                } else {
                    paymentList.add(new CardPayment(paymentId, memberId, amount, dueDate, paymentDate, status, extraInfo));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return paymentList;
    }

    public void saveAllPayments(List<Payment> paymentList) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(FILE_NAME))) {
            for (Payment p : paymentList) {
                String extraField;
                if (p instanceof CashPayment) {
                    extraField = String.valueOf(((CashPayment) p).getAmountReceived());
                } else {
                    extraField = ((CardPayment) p).getTransactionRef();
                }

                if (extraField == null || extraField.isEmpty()) {
                    extraField = "N/A";
                }

                String dateOfPayment = (p.getPaymentDate() == null || p.getPaymentDate().isEmpty()) ? "N/A" : p.getPaymentDate();

                writer.println(
                        p.getPaymentId() + "," +
                                p.getMemberId() + "," +
                                p.getAmount() + "," +
                                p.getDueDate() + "," +
                                dateOfPayment + "," +
                                p.getStatus() + "," +
                                p.getPaymentType() + "," +
                                extraField
                );
            }
        } catch (IOException e) {
            System.err.println("File write error: " + e.getMessage());
        }
    }
}*/