<?php
    session_start();

    $conn = new mysqli("localhost", "root", "");
    if ($conn->connect_errno) {
        printf("Connect failed: %s\n", $mysqli->connect_error);
        return;
    }

    $conn -> set_charset("utf8");

    $pages = [
        "home" => [
            "page" => "home.php",
            "script" => "home.js",
            "scriptinit" => "init",
            "css" => "home.css",
            "navid" => 0
        ],
        "404" => [
            "page" => "notfound.php",
            "navid" => -1
        ]
    ];

    if (array_key_exists("page", $_GET)){
        $page = $_GET["page"];
    } else {
        $page = "home";
    }

    if (isset($pages[$page])){
        $pageo = $pages[$page];
    } else {
        $pageo = $pages[404];
    }

    $auth = isset($_SESSION["user"])
?>
<html>
    <head>
        <title>Bespist</title>
        <meta charset="utf-8" />
        <link rel="icon" href="res/favicon.png">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans" />
        <link href="https://fonts.googleapis.com/css?family=Oxygen" rel="stylesheet">
        <link rel="stylesheet" href="index.css"/>

        <?php
            if(isset($pageo["script"])){
                echo "<script src='".$pageo["script"]."'></script>";
            }

            if(isset($pageo["scriptinit"])){
                ?>
                <script>
                    $(<?php echo $pageo["scriptinit"];?>);
                </script>
                <?php
            }

            if(isset($pageo) and isset($pageo["css"])){
                echo "<link rel='stylesheet' href='".$pageo["css"]."'/>";
            }
        ?>
    </head>
    <body>
        <div id="content">
            <header>
                <div id="logo">
                    <a href='?page=home'><img src="res/logo_transparent_text.png" alt="Faroe Adventures"></a>
                </div>
                <nav id="mainNav">
                    <ul>
                        <li navid=0><a href="/?page=home"> Home </a></li>
                        <li navid=1><a href="/?page=attractions"> Attractions &amp; Travel </a></li>
                        <li navid=2><a href="/?page=contact"> Contact </a></li>
                    </ul>
                </nav>
                <nav id="userNav">
                    <ul>
                        <?php
                        if($auth) {
                            ?>
                            <li navid=3><a style="padding-left: 60px;" href='/?page=mypage'> My page </a></li>
                            <li navid=4><a href='/?page=logout'> Log out </a></li>
                            <?php
                        } else {
                            ?>
                            <li navid=5><a style="padding-left: 60px;" href='/?page=register'> Register </a></li>
                            <li navid=6><a href='/?page=login'> Log in </a></li>
                            <?php
                        }
                        ?>
                    </ul>
                </nav>

                <script>
                    var navid = <?php echo $pageo["navid"];?>;

                    $("ul > li[navid='" + navid + "'] > a").addClass('active');
                </script>
            </header>
            <main>
                <?php
                    include $pageo["page"];
                ?>
            </main>
            <footer>
                <div>&copy; Torstein Vik 2017</div>
            </footer>
        </div>
    </body>
</html>
<?php
    $conn->close();
?>
