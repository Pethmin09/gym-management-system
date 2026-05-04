<%@ page import="com.gym.dao.EquipmentDAO,com.gym.model.Equipment" %>

<%
int id = 0;

try{
    id = Integer.parseInt(request.getParameter("id"));
}catch(Exception e){
    response.sendRedirect("equipment.jsp");
    return;
}

Equipment e = EquipmentDAO.getById(id);

if(e == null){
    response.sendRedirect("equipment.jsp");
    return;
}
%>

<html>
<head>
<title>Update Equipment</title>

<style>
body{
    margin:0;
    font-family:'Segoe UI';
    background:linear-gradient(135deg,#0f172a,#1e293b);
    color:white;
}

/* NAVBAR */
.nav{
    background:#020617;
    padding:15px;
    text-align:center;
}

.nav a{
    color:#38bdf8;
    margin:10px;
    text-decoration:none;
    font-weight:bold;
    transition:0.3s;
}

.nav a:hover{
    color:#22c55e;
}

/* CONTAINER */
.container{
    margin-top:60px;
    display:flex;
    justify-content:center;
    animation:fadeIn 0.6s ease;
}

/* CARD FORM */
form{
    background:#1e293b;
    padding:30px;
    border-radius:15px;
    width:320px;
    box-shadow:0px 10px 25px rgba(0,0,0,0.6);
    transition:0.3s;
}

form:hover{
    transform:translateY(-5px);
}

/* TITLE */
h2{
    text-align:center;
    margin-bottom:20px;
}

/* INPUT */
input{
    width:100%;
    padding:10px;
    margin:10px 0;
    border:none;
    border-radius:5px;
    background:#0f172a;
    color:white;
}

/* BUTTON */
button{
    width:100%;
    padding:12px;
    background:#f59e0b;
    border:none;
    color:white;
    border-radius:8px;
    cursor:pointer;
    font-size:16px;
    transition:0.3s;
}

button:hover{
    background:#d97706;
    transform:scale(1.05);
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
</style>

</head>

<body>

<!-- NAVIGATION -->
<div class="nav">
    <a href="index.jsp">Home</a>
    <a href="addEquipment.jsp">Add</a>
    <a href="equipment.jsp">View</a>
    <a href="about.jsp">About</a>
</div>

<!-- FORM -->
<div class="container">

<form action="update" method="post">

<h2>Update Equipment</h2>

<input type="hidden" name="id" value="<%=e.getId()%>">

<input type="text" name="name" value="<%=e.getName()%>" placeholder="Name" required>

<input type="text" name="type" value="<%=e.getType()%>" placeholder="Type" required>

<input type="number" name="quantity" value="<%=e.getQuantity()%>" placeholder="Quantity" min="1" required>

<input type="text" name="condition" value="<%=e.getCondition()%>" placeholder="Condition" required>

<button type="submit">Update Equipment</button>

</form>

</div>

</body>
</html>