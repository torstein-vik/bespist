// init-function
$(function(){

    // Load all the products into the DOM and hide all tabs
    load().done(() => {
        // Hide all tabs
        $(".selectionelement").hide();

        // Initialises the system responsible for tabs
        initSelectionSystem();

        initModalSystem();

        // Load the specified URL
        loadURL(url);




        // Show the previously hidden body (this is to prevent ugly loading)
        $("body").show();
    });

    // Refresh the basket-page
    refreshBasket();

    initGenders();

    // On submit method for complete purchase form
    $("#completepurchase").on('submit', SendBestilling);

    // Start the slideshow
    startSlideshow();

});

function load(){
    return $.when(loadProducts(), loadLogin());
}

function loadLogin(){
    var def = new $.Deferred();

    $.ajax({
        url: "api.php?type=checklogin"
    }).done((json) => {
        var result = JSON.parse(json);

        if (result.status == 1){
            $("#usernav").html(`
                <div>Velkommen, ${result.username}</div>
                <div id="logoutbutton"> Logg ut </div>
            `);

            $("#usernav #logoutbutton").click(() => {
                if(window.confirm("Er du sikker på at du vil logge ut?")){
                    $.ajax({
                        url: "api.php?type=logout"
                    }).done((json) => {
                        var result = JSON.parse(json);

                        if(result.status == 1){

                            loadLogin();
                        } else {
                            alert("Error when logging out. Please try again");
                        }
                    });
                }
            });
        } else {
            $("#usernav").html(`
                <div id="loginbutton" class="modalbutton" for="login-modal"> Logg inn </div>
                <div id="registerbutton" class="modalbutton" for="register-modal"> Registrer </div>
            `);

            initModalSystemHandlers();
            initLoginSystem();
            initRegisterSystem();
        }

        def.resolve();
    });

    return def;
}

function initGenders(){
    genders.forEach((gender, index) => {
        $("#register #genders").append("<option value='" + index + "'>" + gender + "</option>");
    });
}

function initLoginSystem(){
    $("#login").off();
    $("#login").on('submit', (e) => {
        e.preventDefault();

        var username, password;
        username = $("#login #username").val();
        password = $("#login #password").val();

        $.ajax({
            url: "api.php?type=login",
            method: "POST",
            data: {
                username: username,
                password: password
            }
        }).done((json) => {
            var result = JSON.parse(json);

            if (result.success){
                loadLogin();
                $("#login-modal modalheader div").click();
            } else {
                alert(result.message);
            }
        });
    });
}

function initRegisterSystem(){
    $("#register").off();
    $("#register").on('submit', (e) => {
        e.preventDefault();

        var username, password1, password2;
        username = $("#register #username").val();
        password1 = $("#register #password1").val();
        password2 = $("#register #password2").val();

        $.ajax({
            url: "api.php?type=register",
            method: "POST",
            data: {
                username: username,
                password1: password1,
                password2: password2
            }
        }).done((json) => {
            var result = JSON.parse(json);

            if (result.success){
                loadLogin();
                $("#register-modal modalheader div").click();
            } else {
                alert(result.message);
            }
        });
    });
}

function loadURL(url){
    switch(url){
        case "":
            $("#home").show();
            $("#subject > div[for=home]").addClass("active");
            break;
        case "home":
            $("#home").show();
            $("#subject > div[for=home]").addClass("active");
            break;
        case "products":
            $("#products").show();
            $("#subject > div[for=products]").addClass("active");
            break;
        case "cart":
            $("#finish").show();
            $("#subject > div[for=finish]").addClass("active");
            break;
        default:
            $("#404page").show();
            break;

    }
}


// Initialises the system responsible for tabs
function initSelectionSystem(){
     // When a tab button is clicked...
    $(".selection > div").click(function(event){

        // Select the div that should open when this tab button is pressed
        var tab = $("#" + $(this).attr("for"));

        // If it is active from before...
        if($(this).hasClass("active")){

            // Then unactivate the button
            $(this).removeClass("active");

            // And slide up
            tab.slideUp();

        } else {
            // Else do the following:

            // Make this the active tab
            $(this).addClass('active');

            // Retrive the group of the tab-button parent, i.e. which 'group' of tabs it is from
            var parentid = $(this).parent().attr('group');

            // If there is another active tab...
            if($(".selection[group="+parentid+"]").children('.active').length > 1){

                // Make all those other tab buttons inactive
                $(".selection[group="+parentid+"]").children().removeClass('active');
                $(this).addClass('active');


                // Using this group, slide up the corresponing tabs (takes aprox. 1 second), and when done...
                $(".selectionelement[for=" + parentid + "]").slideUp().promise().done(() => {

                    // and if this tab-button is still active (no other tab button has been clicked during the animation),
                    if($(this).hasClass('active')){

                        // Slide down the correct tab
                        tab.slideDown();

                        $('.selection-scroller').animate({
                            scrollTop: tab.offset().top - 10
                        });
                    }
                });

            } else {
                // Else just slide down the tab
                tab.slideDown();

            }


        }

    });
}

// Load all the products into the DOM
function loadProducts(){
    var def = new $.Deferred();
    $.ajax({
        url:"api.php?type=products"
    }).done((json) => {
        var products = JSON.parse(json);


        // For all products (see products.json), do...
        products.forEach((product, index) => { // product is the product and index is the index of the product in the array

            // Add the tab-button with opening product<index> and with product.name as text
            $("#order-selection-"+product.category).append("<div class='productbutton' id='button"+product.id+"' for='product"+product.id+"'><img src="+product.image+">"+product.name+"</div>");

            // Add the actual tab div, with product.name as title and product.description as a description.
            $("#products").append("<div class='selectionelement' for='order-selection' id='product"+product.id+"'><h2>"+product.name+"</h2>"+product.description+"<p></div>");

            // Add the order button, which opens a div with a form (using tab-system)
            $("#product"+product.id).append('<div class="selection" id="order'+product.id+'"><div for="order'+product.id+'-content" style="width:100%;">Bestill ('+product.price+' kr)</div></div>');

            // Add the div containing the order-form which is opened by the order button.
            $("#product"+product.id).append('<div for="order'+product.id+'" class="selectionelement" id="order'+product.id+'-content"><form></form></div>');

            // Add various input-fields to the form above
            $("#order"+product.id+"-content > form").append('Hvilken dato vil du gå?');
            $("#order"+product.id+"-content > form").append('<input type="date" id="date'+product.id+'"><br>');
            $("#order"+product.id+"-content > form").append('<input type="submit" value="Legg til i handlekurv!"><br>');

            // Put 'today' into the date field
            $("#date" + product.id).get(0).valueAsDate = new Date();

            // When this form is submitted...
            $("#order"+product.id+"-content > form").on('submit', (e) => {

                // Stop the browser from actually sending the form somewhere
                e.preventDefault();

                // Retrive the date

                var date = $("#date" + product.id)[0].valueAsDate;

                // Make sure the date is in the future
                if(date < new Date()){
                    alert("Du må bestille noe i framtiden!");
                    return;
                }

                // Make sure only two on the same day, and only one of each.

                // Load in the basket
                var basket = JSON.parse(localStorage.getItem("basket")) || {content: []};

                // Add the order to the basket
                addToBasket({type: "product", date: date, product: product.id});

                // Simulate a click on the product-tab to close it

                $("#button"+product.id).click();

            });
        });

        def.resolve();
    });

    return def;

}

// Starts the slideshow
function startSlideshow(){

    // Variable to keep track of which slide is being displayed
    var slide = -1;

    // Function that makes the program go to the next slide
    nextSlide = function(){
        // Increment the slide index by one, and if it tips over the gallery length, then bring it back to zero.
        slide = (slide + 1) % gallery.length;

        // Change the src of the slide image to the next one
        $("#slide").attr('src', gallery[slide].path);

        // Change the text of the image to the next one
        $("#slide_text").html(gallery[slide].text);
    }

    // Call the function once first to have an image from the get-go
    nextSlide();

    // Then call it every 4 seconds
    setInterval(nextSlide, 4000);
}

// Add an object to the basket
function addToBasket(object){
    // Either load the basket from local storage, or create a new one

    var basket = JSON.parse(localStorage.getItem("basket")) || {content:[]};

    // Add this order to the basket

    basket.content.push(object);

    // And add the basket to the local storage

    localStorage.setItem("basket", JSON.stringify(basket));

    // Refresh the basket-page

    refreshBasket();
}


// Refresh the basket-page
function refreshBasket(){
    $("#basket tbody").html("");

    // Load the basket
    var basket = JSON.parse(localStorage.getItem("basket")) || {content: []};

    // For calculating the total price
    var totalprice = 0;

    // A list of all the rows in the created table, used for removing items.
    var rows = [];

    // For each element...
    basket.content.forEach((order, index) => {
        // Create a row
        row = $("<tr> </tr>");
        rows[index] = row;

        // Extract the name, which is either a product or a room
        var name = order.type == "room" ? "Rom" : products[order.product].name;

        // Extract the date
        var date = new Date(order.date).toDateString();

        // Extract the amount in case of room, and - else.
        var amt = order.type == "room" ? order.amt : "-";

        // Calculate price
        var price = 0;//order.type == "room" ? order.amt * roomprice : products[order.product].price;

        // Add price to total price
        totalprice += price;

        // Create a button to remove an item from the basket
        var remove = $("<td class='remove'> X </td>");

        // If this button is clicked, remove the associated row
        remove.click(() => {
            if(window.confirm("Er du sikker?")){
                rows[index].remove();
                basket.content.splice(index, 1);
                localStorage.setItem("basket", JSON.stringify(basket));

            }
        });


        // Append all these to the row
        row.append("<td>" + name + "</td>");
        row.append("<td>" + date + "</td>");
        row.append("<td>" + amt + "</td>");
        row.append("<td>" + price + "</td>");
        row.append(remove);

        // Append the row to the baket table
        $("#basket tbody").append(row);
    });

    $("#totprice").html(totalprice);
}

// Collects all the data, empties the basket, and emails the data.
function SendBestilling(e){
    // Stop javascrpt from actually submitting anything
    e.preventDefault();

    // Collect from the form:
    var name = $("#completepurchase > #name").val();
    var address = $("#completepurchase > #address").val();
    var message = $("#completepurchase > #message").val();

    // Forming the email:
    var email = "The following order came in: \n\nName:\n" + name + "\n\nAddress:\n"+address+"\n\nMessage:\n" + message + "\n\nOrders:";


    // Load the basket
    var basket = JSON.parse(localStorage.getItem("basket"));

    // Make sure that went okay
    if(!basket){
        return;
    }

    // Total price
    var totalprice = 0;

    // For each element...
    basket.content.forEach((order, index) => {
        email += "\n";

        // Extract the name, which is either a product or a room
        var name = order.type == "room" ? "Rom" : products[order.product].name;

        // Extract the date
        var date = new Date(order.date).toDateString();

        // Extract the amount in case of room, and - else.
        var amt = order.type == "room" ? order.amt : "-";

        // Calculate price
        var price = 0; //order.type == "room" ? order.amt * roomprice : products[order.product].price;

        // Add price to total price
        totalprice += price;

        // Add all to email
        email += name + ", " + date + (order.type == "room" ? ", "+amt+" personer" : "") + ", til en pris på " + price
    });

    email += "\n\nTotal pris: \n" + totalprice;

    // Sending it
    SendEpost(email);

    // Empty the basket
    localStorage.setItem("basket", JSON.stringify({content:[]}));
    refreshBasket();

    // Empty the fields
    var name = $("#completepurchase > #name").val("");
    var address = $("#completepurchase > #address").val("");
    var message = $("#completepurchase > #message").val("");

    // Alert user
    alert("Gratulerer! Bestillingen har blitt sendt!")
}

// Simulated version of sending an email. Just prints it to console for now.
function SendEpost(email){
    console.log(email);
}


function initModalSystem(){
    $("modal").each(function(){
        var modalheader = $("<modalheader>");
        var header      = $("<h2>");
        var closebutton = $("<div>");

        header.html($(this).attr("title"));
        closebutton.html("&#10005;");

        closebutton.click(() => {
            $(this).animate({top: "150vh"});
            $("body > div").css({"filter": "brightness(100%)", "pointer-events":"all"});
        });

        modalheader.append(header);
        modalheader.append(closebutton);

        $(this).prepend(modalheader);
    });

    initModalSystemHandlers();
}

function initModalSystemHandlers(){
    $(".modalbutton").off();
    $(".modalbutton").click(function(){
        $("modal#" + $(this).attr("for")).animate({top: 100});
        $("body > div").css({"filter": "brightness(30%)", "pointer-events":"none"});
    });
}
