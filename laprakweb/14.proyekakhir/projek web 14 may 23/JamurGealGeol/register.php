<!doctype html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="">
  <link rel="stylesheet" type="text/css" href="fontawesome/css/all.min.css">
  <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">


  <title>Halaman Registrasi</title>
</head>

<body>

  <!-- Form Registrasi -->
  <div class="container">
    <h3 class="text-center mt-3 mb-5">HALAMAN REGISTRASI</h3>
    <div class="card p-5 mb-5">
      <form method="POST" action="simpan_register.php">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="user">Username</label>
            <input type="text" class="form-control" id="user" name="username" placeholder="Masukan Username">
          </div>
          <div class="form-group col-md-6">
            <label for="pass">Password</label>
            <input type="password" class="form-control" id="pass" name="password" placeholder="Masukan Password">
          </div>
        </div>
        <div class="form-group">
          <label for="nama">Nama Lengkap</label>
          <input type="text" class="form-control" id="nama" name="nama_lengkap" placeholder="Masukan Nama Lengkap">
        </div>
        <div class="form-group">
          <label for="jk">Jenis Kelamin</label><br>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="jenis_kelamin" id="jk" value="Laki-Laki">
            <label class="form-check-label" for="jk">Laki-Laki</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="jenis_kelamin" id="jk" value="Perempuan">
            <label class="form-check-label" for="jk">Perempuan</label>
          </div>
        </div>
        <div class="form-group">
          <label for="tgl">Tanggal Lahir</label>
          <input type="date" class="form-control" id="tgl" name="tanggal_lahir">
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="rumah">Alamat</label>
            <input type="text" class="form-control" id="rumah" name="alamat" placeholder="Masukan Alamat">
          </div>
          <div class="form-group col-md-2">
            <label for="telp">No. Telephone</label>
            <input type="text" class="form-control" id="telp" name="hp" placeholder="No. Telephone">
          </div>
          <div class="form-group col-md-4">
            <label for="sts">Status Registrasi</label>
            <select id="sts" class="form-control" name="status">
              <option selected>Pilih...</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <button type="register" class="btn btn-primary">Register</button>
        <button type="reset" class="btn btn-danger">Reset</button>
      </form>
    </div>
  </div>
  <!-- Akhir Form Registrasi -->

  <!-- Optional JavaScript -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>

</body>

</html>