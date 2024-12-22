<!DOCTYPE html>
<html lang="en">

<head>
    <title>Cek Tipe</title>
</head>

<body>
    <?php
    $bil = 3;
    var_dump(is_int($bil));
    // Output: bool(true)
    echo"\n";
    echo'<br>';
    $var = "";
    var_dump(is_string($var));
    // Output: bool(true)
    ?>
</body>

</html>