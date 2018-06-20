$(document).ready(function(){


    $("body").html(`
    <div id = "searchDiv">
    <input type ="text" value="" id = "search">
    <button id="submit">Check BestBuy Inventory</button>
    `);

    

    $("#submit").on("click", function(event){
        event.preventDefault();

        let term = $("#search").val().trim();

        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.bestbuy.com/v1/products%28%28search="+term+"%29%29?apiKey=A1KfLKNYXxCux4LzG87ur1tV&format=json",
            "method": "GET"
            };

        $.ajax(settings).done(function (response) {
            console.log(response);

            if (response.products["0"].onlineAvailability = true){
                $("#searchDiv").append(`
                <h6>${response.products["0"].name} is available to buy online!
                `)
            } else if (response.products["0"].onlineAvailability = false){
                $("#searchDiv").append(`
                <h6>Sorry! ${response.products["0"].name} is out of stock.
                `) 
            } else {
                $("#searchDiv").append(`
                <h6>Error
                `)
            }
          });
        $("#search").val("");
    });  

});