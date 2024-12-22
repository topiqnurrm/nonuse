<!DOCTYPE html>
<html lang="en">
    
<head>
    <title>Detail data</title>
</head>
<body>
    <h4>detail data mahasiswa</h4>
    <?php
            include "connect.php";
            $nim = $_GET['nim'];
            $data = mysqli_query($koneksi, "SELECT * FROM db_mahasiswa WHERE nim='$nim'") or die(mysqli_error());
            $no = 1;
            while ($d = mysqli_fetch_array($data)) {
                ?>
                <table>
                    <tr>
                        <td>nim</td>
                        <td>: <?php echo $d['nim'] ?></td>
                    </tr>
                    <tr>
                        <td>nama</td>
                        <td>: <?php echo $d['nama'] ?></td>
                    </tr>
                    <tr>
                        <td>alamat</td>
                        <td>: <?php echo $d['alamat'] ?></td>
                    </tr>
                    
                </table>
                <?php 
            }?>
            
    <a href="full.php">lihat semua data</a>
</body>
</html>