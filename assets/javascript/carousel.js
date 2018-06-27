
$(document).ready(function () {


        var term = "God of War";
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

        $("#search").val("");

        $.ajax(settings).done(function (response) {
            console.log(response);
            $('.Twitch').empty();
            $('#GameInfo').empty(); //clears divs for additional searches
            $('#Video').empty();
            $('#Similar').empty();

            var GameInfo = $('#GameInfo')
            var Video = $('#Video')
            GameInfo.append(`<div id="GameTitle"><h3>${response[0].name}</h3></div>`) // appends game title and added ID for styling
            GameInfo.append(response[0].summary) // appends game summary
            // console.log(response[0].videos);
            if (response[0].videos) {
                Video.append(`
                <div class="carousel-item active embed-responsive embed-responsive-21by9">
                    <iframe class="embed-responsive-item" frameborder=0 allowfullscreen src=https://www.youtube.com/embed/${response[0].videos[0].video_id}></iframe>
                </div>
                `);
                for (var i = 1; i < response[0].videos.length; i++) { //loop to add all videos from object associated with game choice
                    Video.append(`
                    <div class="carousel-item embed-responsive embed-responsive-21by9">
                        <iframe class="embed-responsive-item" frameborder=0 allowfullscreen src=https://www.youtube.com/embed/${response[0].videos[i].video_id}></iframe>
                    </div>
                    `);

                };
            } else {
                Video.text("No Videos Available")
            };

            for (var s = 0; s < response.length; s++) { //loop to show each cover thumbnail of similar games, might change to title and cover
                if (response[s].cover) {
                    $('#Similar').append(`<img class="SimGameThumb" data-id="${response[s].id}" src="https:${response[s].cover.url}">`)
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
                    GameInfo.append(`<div id="GameTitle"><h3>${response[0].name}</h3></div>`) // appends game title and added ID for styling
                    GameInfo.append(response[0].summary) // appends game summary
                    var TwitchSettings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://api.twitch.tv/kraken/streams/?game=" + response[0].name + "&limit=5",
                        "method": "GET",
                        "headers": {
                            "Accept": "application/vnd.twitchtv.v5+json",
                            "Client-ID": "miw3hauybsi442h7ysse8i4y46m3ny",
                        }
                    }
                    $.ajax(TwitchSettings).done(function (response) {
                        console.log(response);

                        $('.Twitch').append(`
                        <h4 id="twitchHeader">Live Play</h4><div class="embed-responsive embed-responsive-21by9"><iframe class="embed-responsive-item" src="http://player.twitch.tv/?channel=${response.streams[0].channel.name}&autoplay=false" allowfullscreen frameborder=0><iframe></div>
                        `)

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


    });