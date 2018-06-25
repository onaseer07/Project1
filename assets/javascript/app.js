$(document).ready(function () {



    $("#submit").on("click", function (event) {
        event.preventDefault();

        var term = $("#search").val().trim();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api-endpoint.igdb.com/games/?search=" + term + "$&limit=10&fields=*&filter[rating][gte]=65&filter[popularity][gte]=3",
            "method": "GET",
            "headers": {
                "user-key": "186a3663d438fb1004a180d435b09d81",
                "accept": "application/json"
            },
        };

          
        $.ajax(settings).done(function (response) {
            console.log(response);
            $('.Twitch').empty();
            $('#GameInfo').empty(); //clears divs for additional searches
            $('#Video').empty();
            $('#Similar').empty();
            /*$("#gameTitleHeader").append(`
            <h1 class = "gameTitleHeader"id = ${response[0].name}>${response[0].name}</h1>
            <h2> Check Out Similar Games</h2>
            <p id = "similarGames">${response[1].name}</p>
            `);*/
            var TwitchSettings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.twitch.tv/kraken/streams/?game="+response[0].name+"&limit=5",
                "method": "GET",
                "headers": {
                    "Accept": "application/vnd.twitchtv.v5+json",
                    "Client-ID": "miw3hauybsi442h7ysse8i4y46m3ny",
                }
              }
            $.ajax(TwitchSettings).done(function (response) {
                console.log(response);

                $('.Twitch').append(`<iframe height=300px src="http://player.twitch.tv/?channel=${response.streams[0].channel.name}&autoplay=false" allowfullscreen frameborder=0><iframe>`)

            })

            var GameInfo = $('#GameInfo')
            var Video = $('#Video')
            GameInfo.append(`<div id="GameTitle">${response[0].name}</div>`) // appends game title and added ID for styling
            GameInfo.append(response[0].summary) // appends game summary
            // console.log(response[0].videos);
            if (response[0].videos) {
                for (var i = 0; i < response[0].videos.length; i++) { //loop to add all videos from object associated with game choice
                    Video.append(`<iframe frameborder=0 allowfullscreen src=https://www.youtube.com/embed/${response[0].videos[i].video_id}></iframe>`)
                }
            } else {
                Video.text("No Videos Available")
            }
            
            for (var s = 0; s < response.length; s++) { //loop to show each cover thumbnail of similar games, might change to title and cover
                if(response[s].cover){
                $('#Similar').append(`<img class="SimGameThumb" height=50px data-id="${response[s].id}" src="https:${response[s].cover.url}">`)
                }
            }
            $('.SimGameThumb').on('click', function (event) { //click function to change main display when a similar game is clicked on
                event.preventDefault();
                var term1 = $(this).attr('data-id')
                var settings1 = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://api-endpoint.igdb.com/games/" + term1 + "?fields=*",
                    "method": "GET",
                    "headers": {
                        "user-key": "186a3663d438fb1004a180d435b09d81",
                        "accept": "application/json"
                    },
                };
                $.ajax(settings1).done(function (response) {
                    console.log(response);
                    $('.Twitch').empty();
                    $('#GameInfo').empty(); //clears divs for additional searches
                    $('#Video').empty();
                    var GameInfo = $('#GameInfo')
                    var Video = $('#Video')
                    GameInfo.append(`<div id="GameTitle">${response[0].name}</div>`) // appends game title and added ID for styling
                    GameInfo.append(response[0].summary) // appends game summary
                    var TwitchSettings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://api.twitch.tv/kraken/streams/?game="+response[0].name+"&limit=5",
                        "method": "GET",
                        "headers": {
                            "Accept": "application/vnd.twitchtv.v5+json",
                            "Client-ID": "miw3hauybsi442h7ysse8i4y46m3ny",
                        }
                      }
                    $.ajax(TwitchSettings).done(function (response) {
                        console.log(response);
        
                        $('.Twitch').append(`<iframe height=300px src="http://player.twitch.tv/?channel=${response.streams[0].channel.name}&autoplay=false" allowfullscreen frameborder=0><iframe>`)
        
                    })
                    if (response[0].videos) {
                        for (var i = 0; i < response[0].videos.length; i++) { //loop to add all videos from object associated with game choice
                            Video.append(`<iframe frameborder=0 allowfullscreen src=https://www.youtube.com/embed/${response[0].videos[i].video_id}></iframe>`)
                        }
                    }
                    else {
                        Video.text("No Videos Available")
                    }
                    // for(var j=1;j < response[0].games.length;j++){
                    //     $('#Similar').append(`<img class="SimGameThumb" height=50px data-id="${response[j].games[j].id}" src="https:${response[j].games[j].cover.url}">`)
                    // }
                })
            })

            var bestBuyTerm = {
                firstResponse: response[0].name.trim(),
            };
            var bestBuysettings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.bestbuy.com/v1/products%28%28search=" + JSON.stringify(bestBuyTerm.firstResponse) + "%29%29?apiKey=A1KfLKNYXxCux4LzG87ur1tV&format=json",
                "method": "GET"
            };

            $.ajax(bestBuysettings).done(function (bestBuyData) {
                console.log(bestBuyData);

                if (bestBuyData.products["0"].onlineAvailability = true) {
                    $("#gameTitleHeader").append(`
                    <h6>${bestBuyData.products["0"].name} is available to buy online!
                    `)
                } else if (bestBuyData.products["0"].onlineAvailability = false) {
                    $("#gameTitleHeader").append(`
                    <h6>Sorry! ${bestBuyData.products["0"].name} is out of stock.
                    `)
                } else {
                    $("#gameTitleHeader").append(`
                    <h6>Error
                    `)
                }
            });
        });

    })
    //IGDB API Call Begins

    //IGDB API Call Ends

    //Best Buy API Call Begins

    /*$("#submit").on("click", function(event){
        event.preventDefault();

        var term = $("#search").val().trim();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.bestbuy.com/v1/products%28%28search="+term+"%29%29?apiKey=A1KfLKNYXxCux4LzG87ur1tV&format=json",
            "method": "GET"
            };

        $.ajax(settings).done(function (response) {
            console.log(response);

            if (response.products["0"].onlineAvailability = true){
                $("#gameTitleHeader").append(`
                <h6>${response.products["0"].name} is available to buy online!
                `)
            } else if (response.products["0"].onlineAvailability = false){
                $("#gameTitleHeader").append(`
                <h6>Sorry! ${response.products["0"].name} is out of stock.
                `) 
            } else {
                $("#gameTitleHeader").append(`
                <h6>Error
                `)
            }
          });
        $("#search").val("");
    });*/
    //Best Buy API Call Ends
});