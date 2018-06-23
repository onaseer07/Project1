$(document).ready(function(){



    $("#submit").on("click", function(event){
        event.preventDefault();
        
        var term = $("#search").val().trim();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api-endpoint.igdb.com/games/?search="+term+"&fields=*",
            "method": "GET",
            "headers": {
              "user-key": "186a3663d438fb1004a180d435b09d81",
              "accept": "application/json"
            },
          };
          if (term =="") {
            $("body").append(`
            <div class="modal fade" id="myModal" role="dialog">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <p class ="float-left">Oops!</p>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    
                  </div>
                  <div class="modal-body">
                    <p>Please enter a text in the search field!</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default rounded-0" data-dismiss="modal">Close</button>
                  </div>
                </div>
                
              </div>
            </div>
            `);
            $("#myModal").modal();
          }else {
            $.ajax(settings).done(function (response) {
                console.log(response);
                /*$("#gameTitleHeader").append(`
                <h1 class = "gameTitleHeader"id = ${response[0].name}>${response[0].name}</h1>
                <h2> Check Out Similar Games</h2>
                <p id = "similarGames">${response[1].name}</p>
                `);*/
                $("#gameTitleHeader").html(`
                ${response[0].name}`).append(`
                <p>
                <span class = "float-left"><img src="https:${response[0].cover.url}" height="auto"></span>
                <span class = "float-right gameInfo">
                    Genre:<br>
                    Ratings:<br>
                    Platform Availability:<br>
                    BestBuy AddtoCart: <br>
                </span>
                </p>
                `)
                var bestBuyTerm = {
                    firstResponse:response[0].name.trim().replace(":",""),
                };
                var bestBuysettings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://api.bestbuy.com/v1/products%28%28search="+JSON.stringify(bestBuyTerm.firstResponse)+"%29&categoryPath.name=Video%20Games&class=VIDEO%20GAME%20SOFTWARE%29?apiKey=A1KfLKNYXxCux4LzG87ur1tV&format=json",
                    "method": "GET"
                    };
                $.ajax(bestBuysettings).done(function (bestBuyData) {
                    console.log(bestBuyData);
        
                    if (bestBuyData.products["0"].onlineAvailability = true){
                        $(".gameInfo").append(`
                        <h6>${bestBuyData.products["0"].name} is available to buy online!
                        `)
                    } else if (bestBuyData.products["0"].onlineAvailability = false){
                        $(".gameInfo").append(`
                        <h6>Sorry! ${bestBuyData.products["0"].name} is out of stock.
                        `) 
                    } else {
                        $(".gameInfo").append(`
                        <h6>Error
                        `)
                    }
                  }); 
                  
              });
              $("#search").val("");
          };
          
    });
    
});