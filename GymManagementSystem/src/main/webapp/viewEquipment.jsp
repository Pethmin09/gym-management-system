<%@ page import="java.util.*,com.gym.dao.EquipmentDAO,com.gym.model.Equipment" %>

<%
List<Equipment> list = EquipmentDAO.getAll();
%>

<html>
<head>
<title>Customer View</title>

<style>

body{
    background:#0f172a;
    color:white;
    font-family:'Segoe UI';
    text-align:center;
}

table{
    width:90%;
    margin:auto;
    background:#1e293b;
}

th{
    background:#2563eb;
}

td,th{
    padding:10px;
}

img{
    width:60px;
}

</style>
</head>

<body>

<h2>Available Equipment</h2>

<table>

<tr>
<th>Image</th>
<th>Name</th>
<th>Type</th>
<th>Qty</th>
<th>Condition</th>
</tr>

<% for(Equipment e : list){ %>

<tr>
<td><img src="images/equipment.png"></td>
<td><%=e.getName()%></td>
<td><%=e.getType()%></td>
<td><%=e.getQuantity()%></td>
<td><%=e.getCondition()%></td>
</tr>

<% } %>

</table>

</body>
</html>