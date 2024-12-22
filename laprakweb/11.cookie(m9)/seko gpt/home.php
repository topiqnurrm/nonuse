<?php
session_start();
if (!isset($_SESSION['username'])) { //cek apakah session username sudah dibuat, jika belum maka redirect ke halaman login
    header("Location: login.php");
    exit();
}
?>

<html>

<head>
    <title>Halaman Home</title>
</head>

<body>
    <h2>Selamat datang, <?php echo $_SESSION['username']; ?></h2>
    <h3>Ini adalah halaman home setelah login berhasil</h3>
    <p><a href="logout.php">Logout</a></p>
</body>

</html>