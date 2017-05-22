<?php
    session_start();

    $conn = new mysqli("localhost", "root", "");
    if ($conn->connect_errno) {
        printf("Connect failed: %s\n", $mysqli->connect_error);
        return;
    }

    $conn -> set_charset("utf8");

    $auth = isset($_SESSION["user"]);


    $type = $_GET["type"];

    if ($type == "checklogin"){
        if ($auth){
        ?>
            {
                "status": 1
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
    } else if ($type == "products"){
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

        ?>
            {
                "success": true
                "message": "OK"
            }
        <?php
    }


    $conn->close();
?>
