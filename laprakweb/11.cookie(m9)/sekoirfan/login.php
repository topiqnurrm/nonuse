<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_login";

//membuat koneksi
$conn = mysqli_connect($servername, $username, $password, $dbname);
//cek koneksi
if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
?>

<?php
//memeriksa apakah form telah disubmit
if (isset($_POST['login'])) {
    //mengambil data dari form
    $username = $_POST['username'];
    $password = $_POST['password'];
    //melakukan query ke database
    $login = mysqli_query($conn, "SELECT * FROM tbl_user WHERE username = '$username' AND password = '$password'");
    $cek = mysqli_num_rows($login);
    //memeriksa apakah login sukses
    if ($cek > 0) {
        session_start();
        $_SESSION['login'] = $username;
        header("location: halamandepan.php");
    }else{
        echo "<h2>Login gagal!!</h2>";
        echo "klik <a href='index.php'>disini</a> untuk mengulang.";
    }
}
mysqli_close($conn)
?>