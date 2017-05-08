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

    if($type == "products"){
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
                    "description": "Bli med på en gruppetur til Blæja! Denne fantastiske fjelltoppen tar omtrent 4 timer, og koster omlag 1500. Utsikten fra toppen er vidunderlig, og skiføret er fantastisk. Om det er snø legger vi selvfølgelig opp til mulighet for å gå på ski. Her er en video: <video src='media/blæja.mp4' controls></video> <img src='media/blæja.jpg' class='content-img'>",
                    "price": 1500
                },
                {
                    "name": "Skruven",
                    "description": "Denne siden er under bearbeidelse. Turen tar 5 timer.",
                    "price": 1700
                }
            ]
        <?php
    }


    $conn->close();
?>
