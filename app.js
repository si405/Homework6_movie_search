$(document).ready(function() {

    BASE_URL = "http://www.omdbapi.com?";

    // Prepare the Handlebars template so that it is executed only once for
    // performance improvements

    var source = $("#movie-template").html();
    var movieTemplate = Handlebars.compile(source);

    // Detect the search button being clicked
    $("#movie-search-button").on('click', function() {
        // Get the title of the movie being searched. Encode the input field
        // for use in the URL
        var movieTitle = encodeURIComponent($('#movie-title').val());
        var searchURL = BASE_URL + "s=" + movieTitle;
        $.ajax({
            type: "GET",
            url: searchURL,
            // If successful, the GET returns an object "Search" which contains
            // an array of the movies that match the search criteria
            success: function(movies) {
                  // For each movie in the returned array, use the movie id
                  // imdbID to find mroe details on that specific movie
                  $('#search-input-box').hide();
                  movies.Search.forEach(function(movie) {
                      var movieID = movie.imdbID;
                      var specificMovieURL = BASE_URL + "i=" + movieID;
                      $.ajax({
                          type: "GET",
                          url: specificMovieURL,
                          // If successful, the details for the speciic movie
                          // is returned.
                          // The next step is to display the movie details
                          success: function(specificMovie) {
                              //console.log(specificMovie);
                              var newHTML = movieTemplate(specificMovie);
                              $('#movie-card-container').append(newHTML);
                              $('.movie-card').show();
                          },
                          error: function() {
                              alert("Unable to find movie ID " + movieID);
                          }
                      // End of GET for specific movie
                      });
                  });
              // End of movies.forEach
            },
            error: function() {
              alert("Unable to search for " + movieTitle);
            }
        });
    // End of $("#movie-search-button").on('click')
    });

    // Detect the search again button being clicked to return to the
    // search dialogue box
    // Detect the search button being clicked
    // End of $("#movie-search-button").on('click'
    });

    $(document).on("click", "#search-again-button", function(event) {
        event.preventDefault();
        location.reload();
//End of $(document).ready
});
