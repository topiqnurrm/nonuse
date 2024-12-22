<?php
include 'koneksi.php';
?>

<!doctype html>
<html lang="en">

<head>

  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="fontawesome/css/all.min.css">
  <link rel="stylesheet" type="text/css" href="css/login.css">
  <!-- <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"> -->


  <title>Halaman Login</title>
</head>

<body>
  <!-- Form Login -->
  <div class="container">
    <h4 class="text-center">FORM LOGIN</h4>
    <hr>
    <form method="POST" action="">
      <div class="form-group">
        <label for="exampleInputEmail1">Username</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text"><i class="fas fa-user"></i></div>
          </div>
          <input type="text" class="form-control" placeholder="Masukkan Username" name="username">
        </div>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text"><i class="fas fa-unlock-alt"></i></div>
          </div>
          <input type="password" class="form-control" placeholder="Masukkan Password" name="password">
        </div>
      </div>
      <div class="mb-3">
        <small><a href="register.php" class="text-dark">Belum Punya Akun ? Buat Akun Anda !</a></small>
      </div>
      <button type="submit" name="submit" class="btn btn-primary">LOGIN</button>
      <button type="reset" name="reset" class="btn btn-danger">RESET</button>
    </form>
    <!-- Akhir Form Login -->

    <!-- Eksekusi Form Login -->
    <?php
    if (isset($_POST['submit'])) {
      $user = $_POST['username'];
      $password = $_POST['password'];

      // Query untuk memilih tabel
      $cek_data = mysqli_query($koneksi, "SELECT * FROM user WHERE username = '$user' AND password = '$password'");
      $hasil = mysqli_fetch_array($cek_data);
      $status = $hasil['status'];
      $login_user = $hasil['username'];
      $row = mysqli_num_rows($cek_data);

      // Pengecekan Kondisi Login Berhasil/Tidak
      if ($row > 0) {
        session_start();
        $_SESSION['login_user'] = $login_user;

        if ($status == 'admin') {
          header('location: admin.php');
        } elseif ($status == 'user') {
          header('location: user.php');
        }
      } else {
        header("location: login.php");
      }
    }
    ?>
  </div>
  <!-- Akhir Eksekusi Form Login -->







  <!-- Optional JavaScript -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>

</body>

</html>