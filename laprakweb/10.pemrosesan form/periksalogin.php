<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST["username"];
        $password = $_POST["password"];
        if (!is_string($username) || !is_string($password)) {
            echo "<p>Cek kembali mungkin anda salah memasukkan akun / password</p>";
        } elseif ($username == "taufiq" && $password == "mashok") {
            echo "<p>SELAMAT DATANG, $username!</p>";
        } else {
            echo "<p>Login Batal !!</p>";
        }
    }
?>