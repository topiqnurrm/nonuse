<!DOCTYPE html>
<html>

<head>
    <title>Login Result</title>
</head>

<body>
    <?php
    $id = $_POST["id"];
    $password = $_POST["password"];
    if (!is_string($id) || !is_string($password)) {
        echo "Error: ID/Username and Password must be string";
    } elseif ($id == "admin" && $password == "password") {
        echo "Welcome, " . $id . "!";
    } else {
        echo "Login Failed";
    }
    ?>
</body>

</html>