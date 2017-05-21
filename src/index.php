<html>
    <head>
        <title>Bespist</title>
        <meta charset="utf-8" />

        <script src="lib/jquery-3.2.1.min.js"></script>

        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Oxygen"    rel="stylesheet" type="text/css">

        <link rel="stylesheet" href="index.css"/>

        <script src="gallery.json"> </script>
        <script src="index.js"> </script>
        <script>
        var url = "<?php echo (isset($_GET["page"]) ? $_GET["page"] : "");?>";
        </script>

    </head>
    <body style="display: none;">
        <div id="header">

            <h1 class="title" id="title"> Bespist </h1>
            <div id="usernav">
                <div id="login" class="modalbutton" for="login-modal"> Logg inn </div>
                <div id="register" class="modalbutton" for="register-modal"> Registrer </div>
            </div>

            <div class="selection" id="subject">
                <div for="home">Hjem</div>
                <div for="products">Vårt utvalg</div>
                <div for="finish">Handlekurv</div>
            </div>
        </div>
        <div id="global">


            <div id="content">
                <div id="home" for="subject" class="selectionelement">

                    <img id="slide">
                    <div id="slide_text"></div><p><br>

                    Vil du ha mat? Det serverer vi!<p><br>

                </div>
                <div id="products" for="subject" class="selectionelement">
                    Her er vårt utvalg av matvarer:<br><p>
                    <div class="selection" id="order-selection">
                    </div>
                </div>
                <div id="finish" for="subject" class="selectionelement">
                    <div id="basket">
                        <table>
                            <thead>
                                <td>Navn</td>
                                <td>Antall</td>
                                <td>Pris</td>
                                <td>Avbestill</td>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>

                        <div>Total pris: <span id="totprice"> </span> kr</div>

                        <h2>Fullfør kjøpet</h2>

                        <form id="completepurchase">
                            <input type="text" id="name" placeholder = "Navn">
                            <input type="text" id="address" placeholder = "Adresse">
                            <textarea rows=5 id="message" placeholder="Valgfri melding til oss"></textarea>
                            <input type="submit" value="Gjennomfør!">
                        </form>
                    </div>
                </div>

                <div id="404page" for="subject" class="selectionelement">
                    <h2 style="text-align: center;">404! We could not locate this page!</h2>
                </div>
            </div>
        </div>


    </body>
    <modal id="login-modal" title="Logg inn">
        ejsoifs
    </modal>
    <modal id="register-modal" title="Registrer deg">
        jsoiufdhsa
    </modal>
    <coverpane style="z-index: -1"> </coverpane>
</html>
