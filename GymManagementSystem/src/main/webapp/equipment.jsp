<%@ page import="java.util.*,com.gym.dao.EquipmentDAO,com.gym.model.Equipment" %>

<%
Boolean admin = (Boolean) session.getAttribute("admin");
if(admin == null || !admin){
    response.sendRedirect("adminLogin.jsp");
    return;
}

String search = request.getParameter("search");

List<Equipment> list =
(search != null && !search.trim().isEmpty())
? EquipmentDAO.search(search)
: EquipmentDAO.getAll();
%>

<html>
<head>
<title>Manage Equipment</title>

<style>
body{
    background:#020617;
    color:white;
    font-family:Segoe UI;
}

/* TITLE */
h2{
    text-align:center;
    margin-top:20px;
}

/* SEARCH */
.searchBox{
    text-align:center;
    margin:20px;
}

input{
    padding:10px;
    width:200px;
    border-radius:8px;
    border:none;
}

/* TABLE DESIGN */
table{
    width:85%;
    margin:auto;
    border-collapse:collapse;
    background:#1e293b;
    border-radius:12px;
    overflow:hidden;
    animation:fade 0.6s ease;
}

th{
    background:#0f172a;
    padding:12px;
    text-align:center;
}

td{
    padding:12px;
    text-align:center;
}

/* ROW HOVER */
tr:hover{
    background:#111827;
}

/* ANIMATION */
@keyframes fade{
    from{opacity:0; transform:translateY(20px);}
    to{opacity:1; transform:translateY(0);}
}

/* BUTTONS */
.btn{
    padding:6px 10px;
    border-radius:6px;
    text-decoration:none;
    font-weight:bold;
    margin:2px;
    display:inline-block;
}

/* EDIT BUTTON */
.edit{
    background:#f59e0b;
    color:white;
    transition:0.3s;
}
.edit:hover{
    transform:scale(1.1);
}

/* DELETE BUTTON */
.delete{
    background:#ef4444;
    color:white;
    transition:0.3s;
}
.delete:hover{
    transform:scale(1.1);
}

</style>
</head>

<body>

<h2>Manage Equipment</h2>

<div class="searchBox">
<form>
<input name="search" placeholder="Search equipment...">
<button>Search</button>
</form>
</div>

<table>

<tr>
<th>ID</th>
<th>Name</th>
<th>Type</th>
<th>Qty</th>
<th>Condition</th>
<th>Action</th>
</tr>

<%
for(Equipment e : list){
%>

<tr>
<td><%=e.getId()%></td>
<td><%=e.getName()%></td>
<td><%=e.getType()%></td>
<td><%=e.getQuantity()%></td>
<td><%=e.getCondition()%></td>

<td>
<a class="btn edit" href="editEquipment.jsp?id=<%=e.getId()%>">Edit</a>
<a class="btn delete" onclick="return confirm('Delete?')" href="delete?id=<%=e.getId()%>">Delete</a>
</td>

</tr>

<% } %>

</table>

</body>
</html>