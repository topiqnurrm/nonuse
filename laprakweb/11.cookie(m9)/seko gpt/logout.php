<?php
    session_start();
    session_unset();
    session_destroy();
    header("Location: login.php"); //redirect ke halaman login setelah logout
    exit();
?>