<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Tambah Kelas</title>
</head>
<body>
    <a href="{{ route('kelas.index') }}">Kembali</a>
    <hr>
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('kelas.store') }}" method="post">
        @csrf
        <table>
            <tr>
                <th>KODE KELAS</th>
                <th>
                    <input type="text" name="kode_kelas" id="kode_kelas" placeholder="Masukkan Kode Kelas">
                </th>
            </tr>
            <tr>
                <th>NAMA KELAS</th>
                <th>
                    <input type="text" name="nama_kelas" id="nama_kelas" placeholder="Masukkan Nama Kelas">
                </th>
            </tr>
        </table>
        <button type="submit" value="Simpan">Simpan</button>
    </form>
</body>
</html>
