
$(document).ready(function () {
    $('#carouselExampleControls').carousel('pause');


    $("#submit").on("click", function (event) {
        event.preventDefault();



        var term = $("#search").val().trim();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://cors-anywhere.herokuapp.com/https://api-endpoint.igdb.com/games/?search=" + term + "$&limit=10&fields=*&filter[rating][gte]=65&filter[popularity][gte]=3",
            "method": "GET",
            "headers": {
                "user-key": "186a3663d438fb1004a180d435b09d81",
                "accept": "application/json"
            },
        };


        $.ajax(settings).done(function (response) {
            console.log(response);
            $('.ScreenContainer').empty();
            $('#Twitch').empty();
            $('#GameInfo').empty(); //clears divs for additional searches
            $('#Video').empty();
            $('#Similar').empty();


            /*$("#gameTitleHeader").append(`
            <h1 class = "gameTitleHeader"id = ${response[0].name}>${response[0].name}</h1>
            <h2> Check Out Similar Games</h2>
            <p id = "similarGames">${response[1].name}</p>
            `);*/

            var BGScreen = $(`<div style="background-image:url(https://images.igdb.com/igdb/image/upload/t_screenshot_big/${response[0].screenshots[0].cloudinary_id}.jpg);
            height:290px;width:100%;position:absolute;overflow:hidden;background-size:cover;right:0;filter:blur(5px);
            background-position-y:-160px;"></div>`).addClass('bg-image')
            $('.ScreenContainer').prepend(BGScreen)
            var CoverImage = $(`<img id="MainCover" src="https://images.igdb.com/igdb/image/upload/t_cover_big/${response[0].cover.cloudinary_id}.jpg" style="height=260px;width=240px;">`)
            $('.ScreenContainer').append(CoverImage)

            var TwitchSettings = {
                "async": true,
                "crossDomain": true,
                "url": "https://cors-anywhere.herokuapp.com/https://api.twitch.tv/kraken/streams/?game=" + response[0].name + "&limit=5",
                "method": "GET",
                "headers": {
                    "Accept": "application/vnd.twitchtv.v5+json",
                    "Client-ID": "miw3hauybsi442h7ysse8i4y46m3ny",
                }
            }
            $.ajax(TwitchSettings).done(function (response) {
                console.log(response);

                $('#Twitch').append(`<iframe height=300px width=100% src="http://player.twitch.tv/?channel=${response.streams[0].channel.name}&autoplay=false" allowfullscreen frameborder=0><iframe>`)

            })

            var GameInfo = $('#GameInfo')
            var Video = $('#Video')
            var ScreenShots = $('#ScreenShots')
            GameInfo.append(`<div id="GameTitle">${response[0].name}</div>`) // appends game title and added ID for styling
            GameInfo.append(response[0].summary) // appends game summary


            if (response[0].videos) {
                Video.append(`<div class="carousel-item active">
                <iframe class="d-block w-100" frameborder=0 height=300px width=300px allowfullscreen src="https://www.youtube.com/embed/${response[0].videos[0].video_id}"></iframe>
                </div>`)

                for (var i = 1; i < response[0].videos.length; i++) { //loop to add all videos from object associated with game choice
                    Video.append(`<div class="carousel-item">
                    <iframe class="d-block w-100" frameborder=0 height=300px width=300px allowfullscreen src="https://www.youtube.com/embed/${response[0].videos[i].video_id}"></iframe>
                    </div>`)
                }
            } else {
                Video.empty();
            }
            if (response[0].screenshots) {
                for (var i = 0; i < response[0].screenshots.length; i++) {
                    Video.append(`<div class="carousel-item">
                <img class="d-block w-100" height="300" width="300" src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/${response[0].screenshots[i].cloudinary_id}.jpg"></div>`)
                }
            }

            $('#Similar').append(`<div class="carousel-item active">
            <img class="SimGameThumb d-block w-100" height="160" width="240" data-id="${response[0].id}" src="https://images.igdb.com/igdb/image/upload/t_cover_med/${response[0].cover.cloudinary_id}.jpg">
            <div class="carousel-caption d-none d-sm-block">
            <p id="CText">${response[0].name}</p>
            </div>
            </div>`)
            for (var s = 1; s < response.length; s++) { //loop to show each cover thumbnail of similar games, might change to title and cover
                if (response[s].cover) {
                    $('#Similar').append(`<div class="carousel-item">
                    <img class="SimGameThumb d-block w-100" height="160" width="240" data-id="${response[s].id}" src="https://images.igdb.com/igdb/image/upload/t_cover_big/${response[s].cover.cloudinary_id}.jpg">
                    <div class="carousel-caption d-none d-sm-block">
                    <p id="CText">${response[s].name}</p>
                    </div>
                    </div>`)
                }
            }
            $('.SimGameThumb').on('click', function (event) { //click function to change main display when a similar game is clicked on
                event.preventDefault();

                var term1 = $(this).attr('data-id')
                var settings1 = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://cors-anywhere.herokuapp.com/https://api-endpoint.igdb.com/games/" + term1 + "?fields=*",
                    "method": "GET",
                    "headers": {
                        "user-key": "186a3663d438fb1004a180d435b09d81",
                        "accept": "application/json"
                    },
                };
                $.ajax(settings1).done(function (response) {
                    console.log(response);
                    $('.ScreenContainer').empty();
                    $('#Twitch').empty();
                    $('#GameInfo').empty(); //clears divs for additional searches
                    $('#Video').empty();
                    var BGScreen = $(`<div style="background-image:url(https://images.igdb.com/igdb/image/upload/t_screenshot_big/${response[0].screenshots[0].cloudinary_id}.jpg);
                    height:290px;width:100%;position:absolute;overflow:hidden;background-size:cover;right:0;filter:blur(5px);
                    background-position-y:-160px;"></div>`).addClass('bg-image')
                    $('.ScreenContainer').prepend(BGScreen)
                    var CoverImage = $(`<img id="MainCover" src="https://images.igdb.com/igdb/image/upload/t_cover_big/${response[0].cover.cloudinary_id}.jpg" style="height=260px;width=240px;">`)
                    $('.ScreenContainer').append(CoverImage)
                    var GameInfo = $('#GameInfo')
                    var Video = $('#Video')
                    GameInfo.append(`<div id="GameTitle">${response[0].name}</div>`) // appends game title and added ID for styling
                    GameInfo.append(response[0].summary) // appends game summary
                    var TwitchSettings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://cors-anywhere.herokuapp.com/https://api.twitch.tv/kraken/streams/?game=" + response[0].name + "&limit=5",
                        "method": "GET",
                        "headers": {
                            "Accept": "application/vnd.twitchtv.v5+json",
                            "Client-ID": "miw3hauybsi442h7ysse8i4y46m3ny",
                        }
                    }
                    $.ajax(TwitchSettings).done(function (response) {
                        console.log(response);

                        $('#Twitch').append(`<iframe height=300px width=100% src="http://player.twitch.tv/?channel=${response.streams[0].channel.name}&autoplay=false" allowfullscreen frameborder=0><iframe>`)

                    })
                    if (response[0].videos) {
                        Video.append(`<div class="carousel-item active">
                        <iframe class="d-block w-100" frameborder=0 height=300px width=300px allowfullscreen src="https://www.youtube.com/embed/${response[0].videos[0].video_id}"></iframe>
                        </div>`)

                        for (var i = 1; i < response[0].videos.length; i++) { //loop to add all videos from object associated with game choice
                            Video.append(`<div class="carousel-item">
                            <iframe class="d-block w-100" frameborder=0 height=300px width=300px allowfullscreen src="https://www.youtube.com/embed/${response[0].videos[i].video_id}"></iframe>
                            </div>`)
                        }
                    } else {
                        Video.empty();
                    }
                    if (response[0].screenshots) {
                        if (!response[0].videos) {
                            Video.append(`<div class="carousel-item active">
                <img class="d-block w-100" height="300" width="300" src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/${response[0].screenshots[0].cloudinary_id}.jpg"></div>`)

                            for (var i = 1; i < response[0].screenshots.length; i++) {
                                Video.append(`<div class="carousel-item">
                <img class="d-block w-100" height="300" width="300" src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/${response[0].screenshots[i].cloudinary_id}.jpg"></div>`)
                            }
                        } else {
                            for (var i = 0; i < response[0].screenshots.length; i++) {
                                Video.append(`<div class="carousel-item">
                <img class="d-block w-100" height="300" width="300" src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/${response[0].screenshots[i].cloudinary_id}.jpg"></div>`)
                            }
                        }

                    }
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