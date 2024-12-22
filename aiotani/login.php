<?php
include 'koneksi.php';
$error_message = ''; // Variabel untuk menyimpan pesan error

if (isset($_POST['submit'])) {
    $user = $_POST['username'];
    $password = $_POST['password'];

    // Query untuk memilih tabel
    $cek_data = mysqli_query($koneksi, "SELECT * FROM user WHERE username = '$user' AND password = '$password'");
    $row = mysqli_num_rows($cek_data);

    // Cek apakah data ditemukan
    if ($row > 0) {
        $hasil = mysqli_fetch_array($cek_data);
        if ($hasil !== null) { // Pastikan hasil tidak null
            $status = $hasil['status']; // Ambil status user
            $login_user = $hasil['username']; // Ambil username user

            session_start();
            $_SESSION['login_user'] = $login_user;

            if ($status == 'admin') {
                header('location: admin.php');
                exit();
            } elseif ($status == 'user') {
                header('location: user.php');
                exit();
            }
        }
    } else {
        $error_message = 'Username atau password salah!'; // Tetapkan pesan error
    }
}
?>


<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="fontawesome/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="css/login.css">
    <title>Halaman Login</title>
</head>

<body>
    <div class="container">
        <h4 class="text-center">FORM LOGIN</h4>
        <hr>
        <!-- Notifikasi error -->
        <?php if ($error_message != ''): ?>
        <div class="alert alert-danger text-center" role="alert">
            <?php echo $error_message; ?>
        </div>
        <?php endif; ?>

        <!-- Form Login -->
        <form method="POST" action="">
            <div class="form-group">
                <label for="exampleInputEmail1">Username</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <img src="images/icon/username.png" alt="Username Icon" style="width: 20px; height: 20px;">
                        </div>
                    </div>
                    <input type="text" class="form-control" placeholder="Masukkan Username" name="username">
                </div>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <img src="images/icon/password.png" alt="Password Icon" style="width: 20px; height: 20px;">
                        </div>
                    </div>
                    <input type="password" class="form-control" placeholder="Masukkan Password" name="password">
                </div>
            </div>
            <div class="mb-3">
                <small><a href="register.php" class="text-dark">Belum Punya Akun? Buat Akun Anda!</a></small>
            </div>
            <button type="submit" name="submit" class="btn btn-primary">LOGIN</button>
            <button type="reset" name="reset" class="btn btn-danger">RESET</button>
        </form>
    </div>
</body>

</html>