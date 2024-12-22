<?php
    session_start();
    if (!isset($_SESSION['login'])) {
        header('location: index.php');
        exit();
    }
    echo "<h2>Selamat login anda berhasil, " .$_SESSION['login'];
    echo "<h2>klik <a href='logout.php'>disini</a> untuk logout(keluar)</h2>";
?>