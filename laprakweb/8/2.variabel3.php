<!DOCTYPE html>
<html lang="en">

<head>
    <title>Demo Variabel</title>
</head>

<body>
    <?php
    $var1 = 3;
    var_dump($var1);
    is_null($var1);
    echo "<br>";
    echo "<br>";
    // Output: int(3)
    $var2 = "";
    var_dump($var2);
    is_null($var2);
    echo "<br>";
    echo "<br>";
    // Output: string(0) ""
    $var3 = null;
    var_dump($var3);
    is_null($var3);
    echo "<br>";
    echo "<br>";
    // Output: NULL
    ?>
    <?php
    if (isset($var1, $var2, $var3)) {
        echo "Semua variabel sudah di-set.";
    } else {
        echo "Setidaknya satu variabel belum di-set.";
    }
    //var3 (null) tidak terbaca oleh fungsi isset()
    ?>

</body>

</html>