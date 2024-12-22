<!DOCTYPE html>
<html>
<head>
    <title>Membuat CRUD Dengan PHP Dan MySQL - Menampilkan data dari database</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <div class="judul">
        <h1>Detail Data</h1>
    </div>

    <br/>

    <br/>

    <?php
    include "koneksi.php";
    $nim = $_GET['nim'];
    $data = mysqli_query($koneksi, "SELECT * from mahasiswa WHERE nim='$nim'") or die(mysqli_error());
    $no = 1;
    while($d = mysqli_fetch_array($data)){
    ?>
        <table>
            <tr>
                <td>NIM</td>
                <td>: <?php echo $d['nim'] ?></td>
            </tr>
            <tr>
                <td>Name</td>
                <td>: <?php echo $d['nama'] ?></td>
            </tr>
            <tr>
                <td>Alamat</td>
                <td>: <?php echo $d['alamat'] ?></td>
            </tr>
            <tr>
            </tr>
        </table>
    <?php } ?>
        <a href="full.php"><<< Kembali Lihat Semua Data</a>
</body>
</html>