<%@ page import="java.util.*,com.gym.dao.EquipmentDAO,com.gym.model.Equipment" %>

<%
String search = request.getParameter("search");

List<Equipment> allList;

if(search != null && !search.trim().isEmpty()){
    allList = EquipmentDAO.search(search);   // FIXED SEARCH
}else{
    allList = EquipmentDAO.getAll();
}

/* ===== PAGINATION ===== */
int pageNo = 1;
int pageSize = 5;

if(request.getParameter("page") != null){
    pageNo = Integer.parseInt(request.getParameter("page"));
}

int start = (pageNo - 1) * pageSize;
int end = Math.min(start + pageSize, allList.size());
%>

<html>
<head>
<title>Customer View</title>

<style>
body{
    margin:0;
    font-family:Segoe UI;
    background:#020617;
    color:white;
}

/* HEADER */
.header{
    text-align:center;
    padding:20px;
}

/* SEARCH */
.searchBox{
    text-align:center;
    margin-bottom:20px;
}

input{
    padding:10px;
    width:220px;
    border-radius:8px;
    border:none;
}

button{
    padding:10px 15px;
    background:#38bdf8;
    border:none;
    color:white;
    border-radius:8px;
    cursor:pointer;
    transition:0.3s;
}

button:hover{
    transform:scale(1.05);
}

/* TABLE */
.table-container{
    width:90%;
    margin:auto;
    overflow:hidden;
    border-radius:12px;
    animation:fadeIn 0.6s ease;
}

table{
    width:100%;
    border-collapse:collapse;
    background:#1e293b;
}

th{
    background:#0f172a;
    padding:12px;
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
@keyframes fadeIn{
    from{
        opacity:0;
        transform:translateY(20px);
    }
    to{
        opacity:1;
        transform:translateY(0);
    }
}

/* PAGINATION */
.pagination{
    text-align:center;
    margin:25px;
}

.page-btn{
    display:inline-block;
    margin:5px;
    padding:10px 15px;
    border-radius:8px;
    background:#1e293b;
    color:#38bdf8;
    text-decoration:none;
    transition:0.3s;
}

.page-btn:hover{
    background:#38bdf8;
    color:white;
    transform:scale(1.1);
}

/* NO DATA */
.noData{
    text-align:center;
    padding:20px;
    color:#94a3b8;
}

</style>

</head>

<body>

<div class="header">
    <h2>Customer Equipment View</h2>
</div>

<div class="searchBox">
<form method="get">
    <input type="text" name="search" placeholder="Search equipment..." value="<%= (search != null) ? search : "" %>">
    <button type="submit">Search</button>
</form>
</div>

<div class="table-container">

<table>

<tr>
<th>ID</th>
<th>Name</th>
<th>Type</th>
<th>Quantity</th>
<th>Condition</th>
</tr>

<%
if(allList.isEmpty()){
%>
<tr>
<td colspan="5" class="noData">No Equipment Found</td>
</tr>
<%
}else{

for(int i=start; i<end; i++){
Equipment e = allList.get(i);
%>

<tr>
<td><%=e.getId()%></td>
<td><%=e.getName()%></td>
<td><%=e.getType()%></td>
<td><%=e.getQuantity()%></td>
<td><%=e.getCondition()%></td>
</tr>

<%
}}
%>

</table>

</div>

<!-- PAGINATION -->
<div class="pagination">

<% if(pageNo > 1){ %>
<a class="page-btn" href="customerDashboard.jsp?page=<%=pageNo-1%>&search=<%= (search!=null)?search:"" %>"> Previous</a>
<% } %>

<% if(end < allList.size()){ %>
<a class="page-btn" href="customerDashboard.jsp?page=<%=pageNo+1%>&search=<%= (search!=null)?search:"" %>">Next </a>
<% } %>

</div>

</body>
</html>