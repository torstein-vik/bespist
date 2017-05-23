<html>
    <head>
        <title>Bespist</title>
        <meta charset="utf-8" />

        <script src="lib/jquery-3.2.1.min.js"></script>

        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Oxygen"    rel="stylesheet" type="text/css">

        <link rel="stylesheet" href="index.css"/>
        <link rel="icon" href="res/logo_small.ico"/>

        <script src="gallery.json"> </script>
        <script src="genders.json"> </script>
        <script src="index.js"> </script>
        <script>
        var url = "<?php echo (isset($_GET["page"]) ? $_GET["page"] : "");?>";
        </script>

    </head>
    <body style="display: none;">
        <div id="header">

            <img src="res/logo_large.svg">

            <h1 class="title" id="title"> Bespist </h1>
            <div id="usernav">
            </div>

            <div class="selection" id="subject" group="subject">
                <div for="home">Hjem</div>
                <div for="products">Vårt utvalg</div>
                <div for="finish">Handlekurv</div>
            </div>
        </div>
        <div id="global" class="selection-scroller">


            <div id="content" >
                <div id="home" for="subject" class="selectionelement">

                    <img id="slide">
                    <div id="slide_text"></div><p><br>

                    Vil du ha mat? Det serverer vi!<p><br>Gå til 'Vårt utvalg', legg alle rettene du vil ha og til hvilke datoer, og på 'Handlekurv' bestiller du alt på en gang! Du trenger en bruker for å bestille, men handlekurven krever ikke dette.<p><br>Vi holder til på kaia i Bergen, men kan sende mat rundt hele landet. Vi kan kontaktes på mobil - +4712345678 - og på epost - kontakt@bespist.no.

                </div>
                <div id="products" for="subject" class="selectionelement">
                    <h3>Her er vårt utvalg av foretter:</h3>
                    <div class="selection" id="order-selection-starter" group="order-selection">
                    </div>
                    <h3>Her er vårt utvalg av hovedretter:</h3>
                    <div class="selection" id="order-selection-main" group="order-selection">
                    </div>
                    <h3>Her er vårt utvalg av desserter:</h3>
                    <div class="selection" id="order-selection-dessert" group="order-selection">
                    </div>


                </div>
                <div id="finish" for="subject" class="selectionelement">
                    <div id="basket">
                        <table>
                            <thead>
                                <td>Navn</td>
                                <td>Dato</td>
                                <td>Antall</td>
                                <td>Pris pr. Enhet</td>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>

                        <div>Total pris: <span id="totprice"> </span> kr</div>

                        <h2>Fullfør kjøpet</h2>

                        <form id="completepurchase" style="display:none">
                            <input type="text" id="address" placeholder = "Adresse" required>
                            <textarea rows=5 id="message" placeholder="Valgfri melding til oss"></textarea>
                            <input type="submit" value="Gjennomfør!">
                        </form>

                        <h3 id="completepurchase-loginmessage"> Du må logge inn før du kan fullføre kjøp! </h3>
                    </div>
                </div>

                <div id="404page" for="subject" class="selectionelement">
                    <h2 style="text-align: center;">404! Vi fant ikke siden du ba om!</h2>
                </div>
            </div>
        </div>


    </body>
    <modal id="login-modal" title="Logg inn">
        <form id="login">
            <input type="text" id="username" placeholder="Brukernavn" required>
            <input type="password" id="password" placeholder="Passord" required>
            <input type="submit" id="name" value="Logg inn!">
        </form>

    </modal>
    <modal id="register-modal" title="Registrer deg">
        <form id="register">
            <input type="text" id="username" placeholder="Brukernavn" required>
            <select id="genders" required>
                <option value="" hidden selected default disabled>Velg kjønn</option>
            </select>
            <input type="password" id="password1" placeholder="Passord" required>
            <input type="password" id="password2" placeholder="Bekreft passord" required>
            <input type="submit" id="name" value="Registrer deg!">
        </form>

    </modal>
</html>
