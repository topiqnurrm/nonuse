<?php
    include "connect.php";
    $nim = $_GET['nim'];
                
    mysqli_query($koneksi, "DELETE FROM db_mahasiswa WHERE nim='$nim'")or die(mysqli_error());
            
    header("location:full.php?pesan=hapus");
