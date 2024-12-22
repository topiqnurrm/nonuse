<DOCTYPE html>
    <html>

    <head>
        <title>Pemrosesan Form</title>
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>

    <body>
        <div class="rectangle">
            <p class="judul_login">Harap Login</p>
            <p class="judul_login">------------------------------------------------------</p>
            <form action="periksalogin.php" method="post" role="form" onsubmit="return validateForm()">
                <label>Username</label>
                <input type="text" name="username" id="username" class="form_login" placeholder="username" autocomplete="off" required>

                <label>Password</label>
                <input type="password" name="password" id="password" class="form_login" placeholder="password" autocomplete="off" required>
                <input type="submit" class="login_submit" value="Login">
            </form>
        </div>

        <script>
            function validateForm() {
                var username = document.getElementById("username").value;
                var password = document.getElementById("password").value;

                if (username == "" || password == "") {
                    alert("Silahkan lengkapi data login");
                    return false;
                }
            }
        </script>
    </body>

    </html>