<!DOCTYPE html>
<html lang="en">

<head>
    <title>Demo</title>
</head>

<body>
    <?php
    $nama = 'Taufiq';
    $umur = 18;
    echo 'Nama saya adalah ' . $nama . ' dan umur saya ' . $umur . ' tahun.';
    // Output: Nama saya adalah Taufiq dan umur saya 18 tahun.
    ?>
    <p> Dokumen HTML </p>
    <?php
    $bilangan = 15;
    if ($bilangan % 2 == 0) {
        echo 'Bilangan ' . $bilangan . ' adalah bilangan genap.';
    } else {
        echo 'Bilangan ' . $bilangan . ' adalah bilangan ganjil.';
    }
    // Output: Bilangan 15 adalah bilangan ganjil.
    ?>
</body>

</html>