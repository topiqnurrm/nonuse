<!DOCTYPE html>
<html lang="en">

<head>
    <title>Data Mahasiswa</title>
</head>

<body>
    <h4>Data Mahasiswa</h4>
    <?php if (isset($_GET['pesan'])) { ?>
        <div style="color:green"><?php echo $_GET['pesan']; ?></div>
    <?php } ?>
    <table border="1">
        <thead>
            <tr>
                <th>No</th>
                <th>NIM</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            <?php
            include "connect.php";
            $data = mysqli_query($koneksi, "SELECT * FROM db_mahasiswa") or die(mysqli_error());
            $no = 1;
            while ($d = mysqli_fetch_array($data)) {
            ?>
                <tr>
                    <td><?php echo $no++; ?></td>
                    <td><?php echo $d['nim']; ?></td>
                    <td><?php echo $d['nama']; ?></td>
                    <td><?php echo $d['alamat']; ?></td>
                    <td>
                        <a href="lihat.php?nim=<?php echo $d['nim']; ?>">lihat</a> |
                        <a href="edit.php?nim=<?php echo $d['nim']; ?>">edit</a> |
                        <a href="#" onclick="hapus('<?php echo $d['nim']; ?>')">hapus</a>
                    </td>
                </tr>
            <?php
            } ?>
        </tbody>
    </table>
    <script>
        function hapus(nim) {
            var konfirmasi = confirm("Apakah Anda yakin akan menghapus data ini?");
            if (konfirmasi) {
                window.location.href = "hapus.php?nim=" + nim;
            }
        }
    </script>
</body>

</html>