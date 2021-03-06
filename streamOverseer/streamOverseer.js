$( 'document' ).ready(function(){

    
    
    // clean up the code off old versions when finished 
    
   
    $('#userPressedEnter').submit(function(event){
      
      event.preventDefault();
      
      // update Jumbotron text
      $('#introLine1').html("Found the streamer you were looking for.");
      $('#introLine2').html("Click below to check whether they're online!");
      $('#introButton').html("Check");
      
      // empty default streamer board
      $('#testingRow').empty();
      
      var StreamerArrayByUser = [];
      
      var userInputData = $('#userInput').val();
      // trim off blank spaces
      var userInputCorrected = userInputData.trim();
      
      
      // call API through ajax using user input
      
      $.ajax({
        dataType: "json",
        url: "https://wind-bow.glitch.me/twitch-api/streams/" + userInputCorrected,
        success: function (jsonStuff){
          if (jsonStuff.stream == null){
            // append the default offline div
            $('#testingRow').append("<div class='col-sm-12 p-2 my-3 mx-1 text-center'>"  +
                                    "<p class='bg-dark'>"+ "Whoops." +"</p>" +
                                    "<img src='https://static-cdn.jtvnw.net/jtv_user_pictures/twitchtexas-profile_image-eae66a216fbd27cb-300x300.png' alt='Responsive image' class='img-fluid mx-auto d-block' />" +
                                    "<p class='bg-dark'>Seems your favorite streamer is offline right now.</p>" +
                                    "</div>");
          } else {
            // append the API packed div 
            $('#testingRow').append("<div id='userFound' class='col-sm-12 p-2 my-3 mx-1 text-center'>" + 
                                    "<a href='https://www.twitch.tv/" + jsonStuff.stream.channel.display_name + "/'>" + "<img src='" + jsonStuff.stream.channel.logo + "'class='img-fluid mx-auto d-block'></a>" +
                                    "<p class='bg-dark'>" + jsonStuff.stream.channel.status + "</p>" + 
                                    "<p class='bg-dark'>" + jsonStuff.stream.viewers + " viewers on " + jsonStuff.stream.channel.display_name  + "</p>" +
                                    "</div>");
            
                    // set background of div as their twitch.tv profile design
                    $('#userFound').css("background-image", "url('" + jsonStuff.stream.channel.profile_banner + "')"); 
          }
        }
      // end of ajax call
      });
      
     
    // end of search bar function  
    });
    
    
    
    // THE DEFAULT DISPLAY BOARD
    
    // The default manually preset array of streamers on main board
    var StreamersArray = ["ESL_SC2", "OgamingSC2", "SypherPK", "freecodecamp", "LeStream", "sodapoppin", "Ninja", "Cizzorz", "Heideltraut", "xQcOW", "Asmongold", "DrDisRespectLIVE"];
    
    // length of array for the for loop
    var StreamersArrayLength = StreamersArray.length;
    
    // The for loop going through the array
    // Automatically append div with ID of the array variable (will be the streamer display name)
    // default append state is offline
    // On each array variable, checks if streamer is online
    // if streamer online, updates the div with data from the json using jQuery .html()
    for (var i=0; i < StreamersArrayLength; i++){
      $('#testingRow').append("<div id='" + StreamersArray[i] + "'" +"class='col-md-3 p-4'>" +
                              "<img src='https://static-cdn.jtvnw.net/jtv_user_pictures/twitchtexas-profile_image-eae66a216fbd27cb-300x300.png' alt='Responsive image' class='img-fluid mx-auto d-block' />" +
                              "<p class='mt-2'>"+ StreamersArray[i] +" is offline.</p>" +
                              "</div>");
   
      // calling the API
      $.ajax({
        dataType: "json",
        url: "https://wind-bow.glitch.me/twitch-api/streams/" + StreamersArray[i],
        
        // append first div column to selected div ID which carries current Streamer name in array
        success: function(jsonInfos){
  
          if (jsonInfos.stream == null){
            // channel is offline => div left in default offline state   
          } else {
            // channel is online
            // make a variable for the div we're appending to
            // using it's ID which is the streamer display name
            var targetDiv = "#" + jsonInfos.stream.channel.display_name;
  
            // replacing with new data fetched from API
              
            $(targetDiv).html("<a target='_blank' href='https://www.twitch.tv/" + jsonInfos.stream.channel.display_name + "/'>" 
                              + "<img src='" + jsonInfos.stream.channel.logo + 
                              "'class='rounded border border-light img-fluid mx-auto d-block'>" +
                              "</a>" +
                              "<p class='mt-2 font-weight-bold'>" + jsonInfos.stream.channel.status + "</p>" + 
                              "<p class='font-weight-light'>" + jsonInfos.stream.viewers + 
                              " viewers on " + jsonInfos.stream.channel.display_name +  
                              "</p>");
          }
        },
        error: function(fail){
          // if AJAX fails to fetch
          $("testingRow").append("<div><h1>Sorry, failed to fetch data from Twitch.</h1></div>");
          
        }
      });
    //end of for loop building main board here
    };
    
  });