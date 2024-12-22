<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Kelas</title>
</head>
<body>
    <a href="{{route('kelas.create')}}">Tambah Data</a>
    <hr>
    <table border="1">
        <tr>
            <th>NO</th>
            <th>KODE KELAS</th>
            <th>NAMA KELAS</th>
            <th>AKSI</th>
        </tr>
        @foreach ($kelas as $key => $item)
        <tr>
            <td>{{ $key + 1 }}</td>
            <td>{{ $item->kode_kelas }}</td>
            <td>{{ $item->nama_kelas }}</td>
            <td>
                <a href="{{route('kelas.show',$item->id)}}">Lihat Detail</a> ||
                <a href="{{route('kelas.edit',$item->id)}}">Edit Data</a> ||
                <form id="" action="{{route('kelas.destroy',$item->id)}}" method="post" style="display: inline;">
                    @method('DELETE')
                    @csrf
                    <button type="submit" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Hapus">Delete Data</button>
                </form>
            </td>
        </tr>
        @endforeach
    </table>
</body>
</html>
