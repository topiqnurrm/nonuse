<?php
session_start();
include "koneksi.php"; //menghubungkan dengan file koneksi.php

if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = mysqli_query($koneksi, "SELECT * FROM user WHERE username='$username' AND password='$password'");

    if (mysqli_num_rows($query) > 0) {
        $_SESSION['username'] = $username; //membuat session dengan key username dan value username yang diinputkan
        header("Location: home.php"); //direct ke halaman home jika login berhasil
        exit();
    } else {
        echo "Username atau password salah";
    }
}
?>

<html>

<head>
    <title>Halaman Login</title>
</head>

<body>
    <h2>Halaman Login</h2>
    <form method="post" action="">
        <label>Username:</label>
        <input type="text" name="username" required><br>
        <label>Password:</label>
        <input type="password" name="password" required><br>
        <input type="submit" name="login" value="Login">
    </form>
</body>

</html>