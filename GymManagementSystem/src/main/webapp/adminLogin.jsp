<html>
<head>
<title>Admin Login</title>

<style>
body{
    background:#020617;
    color:white;
    font-family:Segoe UI;
    text-align:center;
}

.box{
    margin-top:120px;
    display:inline-block;
    padding:30px;
    background:#1e293b;
    border-radius:12px;
}

input,button{
    width:220px;
    padding:10px;
    margin:8px;
}
</style>

</head>

<body>

<div class="box">
<h2>Admin Login</h2>

<form action="adminLoginProcess.jsp" method="post">
<input name="name" placeholder="Name"><br>
<input name="id" placeholder="ID"><br>
<button>Login</button>
</form>

</div>

</body>
</html>