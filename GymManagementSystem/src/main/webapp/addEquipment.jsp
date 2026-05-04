<html>
<head>
<title>Add Equipment</title>

<style>
body{
    font-family:Segoe UI;
    background:#020617;
    color:white;
    text-align:center;
}

form{
    margin-top:50px;
    background:#1e293b;
    padding:20px;
    width:300px;
    margin-left:auto;
    margin-right:auto;
    border-radius:10px;
}

input,button{
    width:90%;
    padding:10px;
    margin:8px;
}
</style>
</head>

<body>

<h2>Add Equipment</h2>

<form action="addEquipment" method="post">

<input name="name" placeholder="Name" required>
<input name="type" placeholder="Type" required>
<input type="number" name="quantity" placeholder="Qty" required>
<input name="condition" placeholder="Condition (good/broken)" required>

<button type="submit">Add</button>

</form>

</body>
</html>