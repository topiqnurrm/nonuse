<!DOCTYPE html>
<html>
<head>
    <title>Halaman Login</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <form action="login.php" method="post">
        <h2>Silahkan Login</h2>
        <label for="username">ID/Username:</label>
        <input type="text" id="username" name="username" placeholder="Username" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Password" required>
        <input type="submit" name="login" value="Login">
    </form>
</body>
</html>