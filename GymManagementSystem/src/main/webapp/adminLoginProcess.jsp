<%
String name = request.getParameter("name");
String id = request.getParameter("id");

if("Shenaya".equals(name) && "25101654".equals(id)){
    session.setAttribute("admin", true);
    response.sendRedirect("adminDashboard.jsp");
}else{
    response.sendRedirect("adminLogin.jsp");
}
%>