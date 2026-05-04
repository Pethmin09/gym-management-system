package com.gym.servlet;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;

@WebServlet("/adminLogin")
public class AdminLoginServlet extends HttpServlet  {

        protected void doPost(HttpServletRequest req, HttpServletResponse res)
                throws ServletException, IOException {

            String name = req.getParameter("name");
            String id = req.getParameter("id");

            if("Shenaya".equals(name) && "25101654".equals(id)){
                HttpSession session = req.getSession();
                session.setAttribute("admin", true);
                res.sendRedirect("index.jsp");
            } else {
                res.sendRedirect("adminLogin.jsp?error=1");
            }
        }
    }

