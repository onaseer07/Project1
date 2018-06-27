

    $(document).ready(function(){

   
    $("#submit").on("click", function (event) {
        event.preventDefault();
        $(".container").html(`
        <div class="row">
            <div class="col-md-6 col-sm-12 p-3">
                <div id="GameInfo" class="text-left">

                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="Twitch p-3 text-center">

                </div>
                <div id="videoContainer" class="text-center">
                    <h4 id="snippetHeader" style="font-family:Montserrat, sans-serif;" class = "p-2">Video Snippet</h4>
                    <div id="Video" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"></div>
                </div>
                <div class="similar-games col-md-12 col-sm-12">
                    <h4 style="font-family:Montserrat, sans-serif;" class = "p-2 text-center">Similar Games</h4>
                    <div id="Similar" style="cursor: pointer;margin-right:5px;padding: 5px;">

                    </div>
                </div>
            </div>
        </div>
        `)


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
            $("#search").val("");
        
            $.ajax(settings).done(function (response) {
            console.log(response);
            $('.Twitch').empty();
            $('#GameInfo').empty(); //clears divs for additional searches
            $('#Video').empty();
            $('#Similar').empty();
            

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

                $('.Twitch').append(` <h4 id="twitchHeader" style="font-family:Montserrat, sans-serif;class = "p-3">Live Play</h4><div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);" class="embed-responsive embed-responsive-21by9"><iframe class="embed-responsive-item" src="http://player.twitch.tv/?channel=${response.streams[0].channel.name}&autoplay=false" allowfullscreen frameborder=0><iframe></div>`)

            })

            var GameInfo = $('#GameInfo')
            var Video = $('#Video')
            GameInfo.append(`<div id="GameTitle"><h3 style="font-family:Montserrat, sans-serif;">${response[0].name}</h3></div>`) // appends game title and added ID for styling
            GameInfo.append(`<span><img id="MainCover" src="https://images.igdb.com/igdb/image/upload/t_cover_big/${response[0].cover.cloudinary_id}.jpg" style="height=auto;width=auto;"><h3>Release Date</h3></span><p>${response[0].summary}</p>`) // appends game summary
            // console.log(response[0].videos);
            if (response[0].videos) {
                    Video.append(`
                    
                    <div class="embed-responsive embed-responsive-21by9" style="background:transparent">
                        <iframe class="embed-responsive-item" frameborder=0 allowfullscreen src=https://www.youtube.com/embed/${response[0].videos[0].video_id}></iframe>
                    </div>
                    `)
            } else {
                Video.text("No Videos Available")
            }

            for (var s = 0; s < response.length; s++) { //loop to show each cover thumbnail of similar games, might change to title and cover
                if (response[s].cover) {
                    $('#Similar').append(`<p class="float-left"><img style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"class="SimGameThumb" data-id="${response[s].id}" src="https:${response[s].cover.url}">`)
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
                    GameInfo.append(`<div id="GameTitle"><h3 style="font-family:Montserrat, sans-serif;">${response[0].name}</h3></div>`) // appends game title and added ID for styling
                    GameInfo.append(`<img id="MainCover" src="https://images.igdb.com/igdb/image/upload/t_cover_big/${response[0].cover.cloudinary_id}.jpg" style="height=260px;width=240px;"><p>${response[0].summary}</p>`) // appends game summary
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
                        <h4 id="twitchHeader" style="font-family:Montserrat, sans-serif;" class = "p-3">Live Play</h4><div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);" class="embed-responsive embed-responsive-21by9"><iframe class="embed-responsive-item" src="http://player.twitch.tv/?channel=${response.streams[0].channel.name}&autoplay=false" allowfullscreen frameborder=0><iframe></div>
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
                    $("span").append(`
                    <h6><button id="addToCart" href="${bestBuyData.products[0].addToCartUrl}">Buy it Online!</button>
                    `)
                } else if (bestBuyData.products["0"].onlineAvailability = false) {
                    $("span").append(`
                    <h6>Sorry! ${bestBuyData.products["0"].name} is out of stock.</h6>
                    `)

                } else {
                    $("span").append(`
                    <h6>Error
                    `)
                }

            });

        });
    }

});
           
$.backstretch([
    "assets/images/bg.jpg"
  , "assets/images/bg2.jpg"
  , "assets/images/bg3.jpg"
], {duration: 6000, fade: 1000});
});

//
