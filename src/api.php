<?php
    session_start();

    $conn = new mysqli("localhost", "root", "","bespist");
    if ($conn->connect_errno) {
        printf("Connect failed: %s\n", $mysqli->connect_error);
        return;
    }

    $conn -> set_charset("utf8");

    $auth = isset($_SESSION["user"]);



    if (!isset($_GET["type"])){
        return;
    }

    $type = $_GET["type"];

    if ($type == "checklogin"){
        if ($auth){
        ?>
            {
                "status": 1,
                "username": "<?php echo $_SESSION["user"]?>"
            }
        <?php
        } else {
        ?>
            {
                "status": 0
            }
        <?php
        }
        return;
    } else if ($type == "logout"){
        unset($_SESSION["user"]);
        unset($_SESSION["userid"]);
        ?>
            {
                "status": 1
            }
        <?php
        return;
    } else if ($type == "products"){
        /*$products = $conn->query("SELECT * FROM products");

        echo "[";
        foreach($products as $product){

        }
        echo "]";*/
        ?>
        [
            {
                "name": "Kvitegga",
                "description": "Denne siden er under bearbeidelse. Turen tar 9 timer.",
                "price": 2500
            },
            {
                "name": "Slogen",
                "description": "Denne siden er under bearbeidelse. Turen tar 8 timer.",
                "price": 2200
            },
            {
                "name": "Blæja",
                "description": "Bli med på en gruppetur til Blæja! ",
                "price": 1500
            },
            {
                "name": "Skruven",
                "description": "Denne siden er under bearbeidelse. Turen tar 5 timer.",
                "price": 1700
            }
        ]
        <?php
    } else if ($type == "login"){
        $username = $_POST["username"];
        $password = $_POST["password"];

        if(!(isset($username) && $username != "" && isset($password) && $password != "")){
            ?>
            {
                "success": false,
                "message": "Vennligst fyll ut alle feltene"
            }
            <?php
            return;

        }

        $username = $conn->escape_string($username);
        $password = $conn->escape_string($password);

        $username_find = $conn->query("SELECT * FROM users WHERE username = '".$username."'");

        if($username_find->num_rows == 0){
            ?>
            {
                "success": false,
                "message": "Vi finner ikke dette brukernavnet!"
            }
            <?php
            return;
        }

        $user = $username_find->fetch_assoc();

        $salt = bin2hex($user['passsalt']);

        $hash = hash('sha256', $password.$salt);
        if($hash == bin2hex($user["passhash"])){
                $_SESSION['userid'] = $user["userid"];
                $_SESSION['user'] = $username;

                ?>
                {
                    "success": true,
                    "message": "OK"
                }
                <?php
                return;
            } else {
                ?>
                {
                    "success": false,
                    "message": "Feil passord"
                }
                <?php
                return;
            }
        return;

    } else if ($type == "register"){
        $username = $_POST["username"];
        $password1 = $_POST["password1"];
        $password2 = $_POST["password2"];

        if(!(isset($username) && $username != "" && isset($password1) && $password1 != "" && isset($password2) && $password2 != "")){

            ?>
            {
                "success": false,
                "message": "Vennligst fyll ut alle feltene"
            }
            <?php
            return;

        }

        if($password1 != $password2){
            ?>
            {
                "success": false,
                "message": "Passordene samsvarer ikke!"
            }
            <?php
            return;
        }

        $username  = $conn->escape_string($username);
        $password1 = $conn->escape_string($password1);
        $password2 = $conn->escape_string($password2);

        $username_ok = $conn->query("SELECT * FROM users WHERE username = '$username'")->num_rows == 0;

        if(!$username_ok){
            ?>
            {
                "success": false,
                "message": "Brukernavnet er i bruk fra før!"
            }
            <?php
            return;
        }

        $salt = bin2hex(random_bytes(32));

        $hash = hash('sha256', $password1.$salt);

        $privilege = "'user'";

        $query = $conn->query("INSERT INTO `users`  (username, passhash, passsalt, privilege) VALUES ('".$username."',0x".$hash.",0x".$salt.",".$privilege.");");

        if($query){
            $userid = $conn->query("SELECT users.userid FROM `mitt-feriested`.`users` WHERE username = '".$username."'")->fetch_assoc();

            $_SESSION['userid'] = $userid["userid"];
            $_SESSION['user'] = $username;

            ?>
            {
                "success": true,
                "message": "OK"
            }
            <?php
            return;
        } else {
            ?>
            {
                "success": false,
                "message": "Ukjent feil"
            }
            <?php
            return;
        }

        return;
    }


    $conn->close();
?>
