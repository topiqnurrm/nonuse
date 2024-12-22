<?php
    include "connect.php";
    $nim = $_POST['nim'];
    $nama = $_POST['nama'];
    $alamat = $_POST['alamat'];
                
    mysqli_query($koneksi, "UPDATE db_mahasiswa SET nama='$nama', alamat='$alamat' WHERE nim='$nim'");
            
    header("location:full.php?pesan=update");
?> 