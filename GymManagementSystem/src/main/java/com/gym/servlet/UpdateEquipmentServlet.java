package com.gym.servlet;

import com.gym.dao.EquipmentDAO;
import com.gym.model.Equipment;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class UpdateEquipmentServlet extends HttpServlet  {

        protected void doPost(HttpServletRequest req, HttpServletResponse res)
                throws ServletException, IOException {

            Equipment e = new Equipment();

            e.setId(Integer.parseInt(req.getParameter("id")));
            e.setName(req.getParameter("name"));
            e.setType(req.getParameter("type"));
            e.setQuantity(Integer.parseInt(req.getParameter("quantity")));
            e.setCondition(req.getParameter("condition"));

            EquipmentDAO.update(e);

            res.sendRedirect("equipment.jsp");
        }
    }

