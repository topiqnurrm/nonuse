<?php
include 'koneksi.php';

if(isset($_GET['Nim'])) {
    $Nim = $_GET['Nim'];
    echo "<script>
    var yakinHapus = confirm('Apakah yakin ingin menghapus data?');
    if(yakinHapus){
        window.location.href='delete.php?Nim=".$Nim."';
    }else{
        window.location.href='tugas.php';
    }
    </script>";
    exit;
}

if(isset($_POST['delete'])){
    $Nim = $_POST['Nim'];
    mysqli_query($koneksi, "DELETE FROM db_mahasiswa WHERE Nim='$Nim'") or die(mysqli_error());
    header("location: tugas.php?pesan=hapus");
}
?>