<!DOCTYPE html>
<html>

<head>
    <title>Latihan 1</title>
</head>

<body>
    <h4>Tambah Data Mahasiswa</h4>
    <form method='post' action='latihan1.php'>
        <table>
            <tr>
                <td>NIM</td>
                <td><input type='number' name='NIM'></td>
            </tr>
            <tr>
                <td>Nama</td>
                <td><input type='text' name='Nama'></td>
            </tr>
            <tr>
                <td>Alamat</td>
                <td><input type='text' name='Alamat'></td>
            </tr>
            <tr>
                <td></td>
                <td><input type='submit' name='SIMPAN'></td>
            </tr>
        </table>
    </form>

    <h2>Menampilkan data mahasiswa</h2>
    <table border="1">
        <tr>
            <th>No</th>
            <th>NIM</th>
            <th>Nama</th>
            <th>Alamat</th>
        </tr>
        <?php
        include('koneksi.php');
        $no = 1;
        $data = mysqli_query($koneksi, "select * from table1");
        while ($d = mysqli_fetch_array($data)) {
        ?>
            <tr>
                <td><?php echo $no++; ?></td>
                <td><?php echo $d['NIM']; ?></td>
                <td><?php echo $d['Nama']; ?></td>
                <td><?php echo $d['Alamat']; ?></td>
            </tr>
        <?php
        }
        ?>
        <?php
        include "koneksi.php";
        $NIM = $_POST['NIM'];
        $Nama = $_POST['Nama'];
        $Alamat = $_POST['Alamat'];

        mysqli_query($koneksi, "insert into table1 values('$NIM','$Nama','$Alamat')");
        ?>
    </table>
</body>

</html>