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
                <div for="order">Turer</div>
                <div for="finish">Handlekurv</div>
            </div>
        </div>
        <div id="global">


            <div id="content">
                <div id="home" for="subject" class="selectionelement">

                    <img id="slide">
                    <div id="slide_text"></div><p><br>

                    Skal du på ferie til Sunnmøre? Her hos Villa Norangdal spesialiserer vi i guidede turer og overnatting!<p><br>
                    Vi organiserer turer til Kvitegga, Slogen, Blæja, og Skruven. Vi driver på året rundt, og på vinteren bruker vi ski! <p><br>
                </div>
                <div id="order" for="subject" class="selectionelement">
                    Vi tilbyr overnatting og turer. Du kan kjøpe disse uavhengig av hverandre, men om du vil overnatte samme helg som du går tur, pass på å velge riktige datoer! Klikk på knappen under for å se overnattingsmuligheter, og på knappene under der igjen for turtilbud. Overnatting inkluderer så klart mat, og koster 2800kr per person.<p>
                    <div class="selection" id="rooms">
                        <div for="room" id="room-button" style="width:100%;"> Overnattingsalternativ</div>
                    </div>
                    <div id="room" class="selectionelement" for="rooms">
                        <form id="roomform">
                            Velg den fredagen dere ønsker skiweekend:
                            <input type="date">
                            Hvor mange personer er dere?
                            <input type="number" value=1 min=0>
                            <input type="submit" value="Legg til i handlekurv (2800 kr)">
                        </form>
                    </div>

                    Her er våre fantastiske turtilbud:<br><p>

                    <div class="selection" id="order-selection">
                    </div>
                </div>
                <div id="finish" for="subject" class="selectionelement">
                    <div id="basket">
                        <table>
                            <thead>
                                <td>Navn</td>
                                <td>Dato</td>
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
