<%@ page import="com.gym.dao.EquipmentDAO" %>

<%
int total = EquipmentDAO.getCount();
int available = EquipmentDAO.getAvailableCount();
int broken = EquipmentDAO.getBrokenCount();
%>

<html>
<head>
<title>Gym Equipment Dashboard</title>

<style>

/* ===== BODY ===== */
body{
    margin:0;
    font-family:'Segoe UI';
    background:#020617;
    color:white;
    overflow-x:hidden;
}

/* ===== BACKGROUND GLOW ===== */
body::before{
    content:"";
    position:fixed;
    width:600px;
    height:600px;
    background:radial-gradient(circle,#3b82f6,transparent);
    top:-120px;
    left:-120px;
    opacity:0.15;
    z-index:-1;
}

/* ===== HEADER ===== */
.header{
    text-align:center;
    padding:25px;
    font-size:26px;
    letter-spacing:1px;
    animation:fadeDown 0.8s ease;
}

/* ===== ANIMATION ===== */
@keyframes fadeDown{
    from{opacity:0; transform:translateY(-20px);}
    to{opacity:1; transform:translateY(0);}
}

/* ===== CARDS ===== */
.cards{
    display:flex;
    justify-content:center;
    gap:25px;
    flex-wrap:wrap;
    margin-top:30px;
}

/* ===== CARD ===== */
.card{
    width:260px;
    padding:25px;
    border-radius:18px;
    background:#0f172a;
    border:1px solid #1e293b;
    text-align:center;
    position:relative;
    overflow:hidden;
    transition:0.4s;
}

/* GLOW BORDER */
.card::before{
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
    transform:translateY(-12px) scale(1.03);
    box-shadow:0 15px 35px rgba(0,0,0,0.7);
}

/* ICON */
.icon{
    font-size:40px;
    margin-bottom:10px;
    animation:float 2s infinite ease-in-out;
}

/* ICON FLOAT */
@keyframes float{
    0%,100%{transform:translateY(0);}
    50%{transform:translateY(-6px);}
}

/* TEXT */
.card h3{
    color:#cbd5f5;
    margin:0;
}

.card h1{
    font-size:34px;
    margin-top:10px;
}

/* ===== BUTTON SECTION ===== */
.buttons{
    text-align:center;
    margin-top:40px;
}

/* BUTTON */
.btn{
    display:inline-block;
    margin:12px;
    padding:14px 22px;
    border-radius:12px;
    text-decoration:none;
    color:white;
    font-weight:bold;
    background:linear-gradient(135deg,#3b82f6,#0ea5e9);
    transition:0.3s;
}

/* HOVER */
.btn:hover{
    transform:scale(1.1);
    box-shadow:0 0 25px rgba(14,165,233,0.7);
}

/* DIFFERENT BUTTON COLORS */
.admin{ background:linear-gradient(135deg,#3b82f6,#2563eb); }
.customer{ background:linear-gradient(135deg,#22c55e,#16a34a); }
.about{ background:linear-gradient(135deg,#f59e0b,#d97706); }

/* BUTTON ICON */
.btn span{
    margin-right:8px;
}

</style>

</head>

<body>

<div class="header">
     Gym Equipment Dashboard
</div>

<div class="cards">

    <div class="card">
        <div class="icon"></div>
        <h3>Total Equipment</h3>
        <h1><%=total%></h1>
    </div>

    <div class="card">
        <div class="icon"></div>
        <h3>Available</h3>
        <h1><%=available%></h1>
    </div>

    <div class="card">
        <div class="icon"></div>
        <h3>Broken</h3>
        <h1><%=broken%></h1>
    </div>

</div>

<div class="buttons">

    <a href="adminLogin.jsp" class="btn admin">
        <span></span> Admin Panel
    </a>

    <a href="customerDashboard.jsp" class="btn customer">
        <span></span> Customer View
    </a>

    <a href="about.jsp" class="btn about">
        <span></span> About
    </a>

</div>

</body>
</html>