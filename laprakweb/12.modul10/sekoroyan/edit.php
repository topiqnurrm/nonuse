<!DOCTYPE html>
<html lang="en">
    
<head>
    <title>Edit data</title>
</head>
<body>
    <h4>edit data mahasiswa</h4>
    <?php
            include "connect.php";
            $nim = $_GET['nim'];
            $data = mysqli_query($koneksi, "SELECT * FROM db_mahasiswa WHERE nim='$nim'") or die(mysqli_error());
            $no = 1;
            while ($d = mysqli_fetch_array($data)) {
                ?>
            <form action='update.php' method='post'>
                <table>
                    <tr>
                        <td>nama</td>
                        <td>
                            <input type='hidden' name='nim' value="<?php echo $d['nim']?>">
                            <input type='text' name='nama' value="<?php echo $d['nama']?>">
                        </td>
                    </tr>
                    <tr>
                        <td>alamat</td>
                        <td><input type='text' name='alamat' value="<?php echo $d['alamat']?>"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type='submit' value="simpan"></td>
                    </tr>
                    
                </table>
            </form>
                <?php 
            }?>
            
    <a href="full.php">lihat semua data</a>
</body>
</html>