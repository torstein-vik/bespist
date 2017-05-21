// init-function
$(function(){

    // Load all the products into the DOM and hide all tabs
    loadProducts().done(() => {
        // Hide all tabs
        $(".selectionelement").hide();

        // Initialises the system responsible for tabs
        initSelectionSystem();


        // Load the specified URL
        loadURL(url);


        // Show the previously hidden body (this is to prevent ugly loading)
        $("body").show();
    });

    // Refresh the basket-page
    refreshBasket();

    initModalSystem();

    // On submit method for complete purchase form
    $("#completepurchase").on('submit', SendBestilling);

    // Start the slideshow
    startSlideshow();

});

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
            $("#purchase").show();
            $("#subject > div[for=purchase]").addClass("active");
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

            // If there is another active tab...
            if($(this).parent().has('.active').length > 0){

                // Make all those other tab buttons inactive
                $(this).siblings().removeClass('active');

                // Retrive the id of the tab-button parent, i.e. which 'group' of tabs it is from
                var parentid = $(this).parent().attr('id');


                // Using this id, slide up the corresponing tabs (takes aprox. 1 second), and when done...
                $(".selectionelement[for=" + parentid + "]").slideUp().promise().done(() => {

                    // and if this tab-button is still active (no other tab button has been clicked during the animation),
                    if($(this).hasClass('active')){

                        // Slide down the correct tab
                        tab.slideDown();
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
        console.log(products);


        // For all products (see products.json), do...
        products.forEach((product, index) => { // product is the product and index is the index of the product in the array

            // Add the tab-button with opening product<index> and with product.name as text
            $("#order-selection").append("<div id='button"+index+"' for='product"+index+"'>"+product.name+"</div>");

            // Add the actual tab div, with product.name as title and product.description as a description.
            $("#products").append("<div class='selectionelement' for='order-selection' id='product"+index+"'><h2>"+product.name+"</h2>"+product.description+"<p></div>");

            // Add the order button, which opens a div with a form (using tab-system)
            $("#product"+index).append('<div class="selection" id="order'+index+'"><div for="order'+index+'-content" style="width:100%;">Bestill ('+product.price+' kr)</div></div>');

            // Add the div containing the order-form which is opened by the order button.
            $("#product"+index).append('<div for="order'+index+'" class="selectionelement" id="order'+index+'-content"><form></form></div>');

            // Add various input-fields to the form above
            $("#order"+index+"-content > form").append('Hvilken dato vil du gå?');
            $("#order"+index+"-content > form").append('<input type="date" id="date'+index+'"><br>');
            $("#order"+index+"-content > form").append('<input type="submit" value="Legg til i handlekurv!"><br>');

            // Put 'today' into the date field
            $("#date" + index).get(0).valueAsDate = new Date();

            // When this form is submitted...
            $("#order"+index+"-content > form").on('submit', (e) => {

                // Stop the browser from actually sending the form somewhere
                e.preventDefault();

                // Retrive the date

                var date = $("#date" + index)[0].valueAsDate;

                // Make sure the date is in the future
                if(date < new Date()){
                    alert("Du må bestille noe i framtiden!");
                    return;
                }

                // Make sure only two on the same day, and only one of each.

                // Load in the basket
                var basket = JSON.parse(localStorage.getItem("basket")) || {content: []};

                // Find all product-orders that have the same date, and make sure there are fewer than two.
                if(basket.content.filter((ob) => new Date(ob.date).toDateString() == date.toDateString() && ob.type == "product").length >= 2){
                    alert("Du har brukt opp alle våre guider den dagen! Venneligst velg en annen dato.");
                    return;
                }

                // Find all product-orders that have the same date and are for the same product, and make sure there are fewer than one.
                if(basket.content.filter((ob) => ob.type == "product" && new Date(ob.date).toDateString() == date.toDateString() && ob.product == index ).length >= 1){
                    alert("Du har allerede reservert den turen den dagen. Venneligst velg en annen dato.");
                    return;
                }

                // Add the order to the basket
                addToBasket({type: "product", date: date, product: index});

                // Simulate a click on the product-tab to close it

                $("#button"+index).click();

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
            $("body > div").css({filter: "brightness(100%)"});
            $("coverpane").css({"z-index":-1});
        });

        modalheader.append(header);
        modalheader.append(closebutton);

        $(this).prepend(modalheader);
    });

    $(".modalbutton").click(function(){
        $("modal#" + $(this).attr("for")).animate({top: 100});
        $("body > div").css({filter: "brightness(70%)"});
        $("coverpane").css({"z-index":10000});
    });

}
