package com.gym.dao;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {

    public static Connection getConnection() {
        Connection con = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/gymdb?useSSL=false&serverTimezone=UTC",
                    "root",
                    ""
            );

            System.out.println(" Database Connected");

        } catch (Exception e) {
            System.out.println(" DB Connection Failed");
            e.printStackTrace();
        }

        return con;
    }
}