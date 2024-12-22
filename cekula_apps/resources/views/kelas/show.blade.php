<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Detail Kelas</title>
</head>
<body>
    <table>
        <tr>
            <th>KODE KELAS</th>
            <th>: {{ $kelas->kode_kelas }}</th>
        </tr>
        <tr>
            <th>NAMA KELAS</th>
            <th>: {{ $kelas->nama_kelas }}</th>
        </tr>
    </table>
    <hr>
    <a href="{{ route('kelas.index') }}">Kembali</a>
</body>
</html>
