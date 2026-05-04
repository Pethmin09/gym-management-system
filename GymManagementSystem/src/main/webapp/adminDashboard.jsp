<%
Boolean admin = (Boolean) session.getAttribute("admin");
if(admin == null || !admin){
    response.sendRedirect("adminLogin.jsp");
    return;
}
%>

<html>
<head>
<title>Admin Panel</title>

<style>
body{
    margin:0;
    font-family:Segoe UI;
    background:#020617;
    color:white;
    overflow-x:hidden;
}

/* BACKGROUND SOFT GLOW */
body::before{
    content:"";
    position:fixed;
    width:500px;
    height:500px;
    background:radial-gradient(circle,#3b82f6,transparent);
    top:-120px;
    left:-120px;
    opacity:0.15;
    z-index:-1;
}

/* CENTER PANEL */
.container{
    text-align:center;
    margin-top:80px;
    animation:fadeDown 0.8s ease;
}

/* TITLE */
h2{
    margin-bottom:45px;
    font-size:28px;
    letter-spacing:1px;
}

/* CARD GRID */
.cards{
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
}

/* MENU CARD */
.card{
    width:260px;
    padding:30px;
    margin:18px;
    background:#1e293b;
    border-radius:18px;
    transition:0.4s;
    cursor:pointer;
    position:relative;
    overflow:hidden;
    font-size:18px;
}

/* GRADIENT BORDER EFFECT */
.card::after{
    content:"";
    position:absolute;
    inset:0;
    border-radius:18px;
    padding:1px;
    background:linear-gradient(45deg,#3b82f6,#22c55e,#ef4444);
    -webkit-mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
}

/* HOVER EFFECT */
.card:hover{
    transform:translateY(-12px) scale(1.05);
    box-shadow:0 15px 35px rgba(0,0,0,0.7);
}

/* ICON */
.icon{
    font-size:42px;
    margin-bottom:12px;
    display:block;
    color:#38bdf8;
    animation:float 2.5s infinite ease-in-out;
}

/* ICON FLOAT ANIMATION */
@keyframes float{
    0%,100%{transform:translateY(0);}
    50%{transform:translateY(-6px);}
}

/* PAGE LOAD ANIMATION */
@keyframes fadeDown{
    from{opacity:0; transform:translateY(-20px);}
    to{opacity:1; transform:translateY(0);}
}

/* LINK STYLE */
a{
    text-decoration:none;
    color:white;
    font-weight:bold;
}

</style>

</head>

<body>

<div class="container">

<h2>Admin Dashboard</h2>

<div class="cards">

<a href="equipment.jsp">
<div class="card">
    <span class="icon"></span>
    Manage Equipment
</div>
</a>

<a href="addEquipment.jsp">
<div class="card">
    <span class="icon"></span>
    Add Equipment
</div>
</a>

<a href="about.jsp">
<div class="card">
    <span class="icon"></span>
    About System
</div>
</a>

<a href="logout.jsp">
<div class="card">
    <span class="icon"></span>
    Logout
</div>
</a>

</div>

</div>

</body>
</html>