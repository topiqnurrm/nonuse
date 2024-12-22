<!DOCTYPE html>
<html lang="en">

<head>
    <title>Identifikasi Metode</title>
</head>

<body>
    <form action="<?php $_SERVER['PHP_SELF']; ?>" method="post"> Nama
        <input type="text" name="nama" /><br />

        <input type="submit" value="ok" />
    </form>

    <?php
    if (isset($_REQUEST['nama'])) {
        echo 'Metode, ' . $_SERVER['REQUEST_METHOD'];
    }
    ?>

</body>

</html>