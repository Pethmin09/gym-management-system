package com.gym.servlet;

import com.gym.dao.EquipmentDAO;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class DeleteEquipmentServlet extends HttpServlet {

    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        try {
            int id = Integer.parseInt(req.getParameter("id"));
            EquipmentDAO.delete(id);

        } catch (Exception e) {
            e.printStackTrace();
        }

        res.sendRedirect("equipment.jsp");
    }
}
