package com.gym.servlet;

import com.gym.dao.EquipmentDAO;
import com.gym.model.Equipment;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class AddEquipmentServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        try {
            Equipment e = new Equipment();

            e.setName(request.getParameter("name"));
            e.setType(request.getParameter("type"));

            String qty = request.getParameter("quantity");
            e.setQuantity((qty == null || qty.isEmpty()) ? 0 : Integer.parseInt(qty));

            e.setCondition(request.getParameter("condition"));

            EquipmentDAO.save(e);

        } catch (Exception ex) {
            ex.printStackTrace();
        }

        response.sendRedirect("equipment.jsp");
    }
}