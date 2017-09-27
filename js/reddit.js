/**
 * Created by User on 27.09.2017.
 */
$(document).ready(function () {
    $("#btnRedditAccio").click(function(){

        $("#searchResults").html("<p>Loading... Please wait.</p>");
        var searchTerm = $("#searchTerm").val();
        var result = "";
        $.ajax(
            "https://www.reddit.com/subreddits/search.json",
            {
                data: { q: searchTerm }, // what are we looking for

                success: function(responseData)
                {

                    if (responseData.data.children.length > 0)
                    {
                        // how many results we have found
                        result += "<p># of results: " + responseData.data.children.length + "</p>";

                        // we print results (each one is wrapped in '<p>' tag)
                        $.each(responseData.data.children, function(idx, searchResult) {
                            result += "<p><a href='https://www.reddit.com" + searchResult.data.url + "'>" + searchResult.data.title + "</a></p>"
                        });
                    }
                    else
                    {
                        result = "No subreddits match the search query!";
                    }
                    $("#searchResults").html(result);
                },

                error: function()
                {
                    result = "Something didn't work!";
                    $("#searchResults").html(result);
                }

            }
        );

    });




});