<!DOCTYPE html>
<html>
<head>
    <title>Membuat CRUD Dengan PHP Dan MySQL - Menampilkan data dari database</title>
    <link rel ="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <div class="judul">
        <h1>Edit data</h1>
    </div>

    <br/>

    <a href="full.php">Lihat Semua Data</a>

    <br/>
    <h3>Edit data</h3>

    <?php
    include "koneksi.php";
    $nim = $_GET['nim'];
    $data = mysqli_query($koneksi,"SELECT * from mahasiswa WHERE nim='$nim'") or die(mysqli_erorr());
    $no = 1;
    while ($d = mysqli_fetch_array($data)){
    ?>
    <form action="update.php" method="post">
        <table>
            <tr>
                <td>Nama</td>
                <td>
                    <input type="hidden" name="nim" value="<?php echo $d['nim'] ?>">
                    <input type="text" name="name" value="<?php echo $d['nama'] ?>">
                </td>
            </tr>
            <tr>
                <td>Alamat</td>
                <td><input type="text" name="alamat" value="<?php echo $d['alamat'] ?>"></td>

            </tr>
            <tr>
                <td></td>
                <td><input type="submit" value="Simpan"></td>
            </tr>
        </table>
    </form>
    <?php } ?>
</body>
</html>