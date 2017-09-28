/**
 * Created by User on 27.09.2017.
 */
$(document).ready(function () {
    $("#btnRedditAccio").click(function(){

        $("#searchResults").html("<p>Loading... Please wait.</p>");
        var searchTerm = $("#searchTerm").val();
        var result = "";
        $.ajax(
            "https://www.reddit.com/search.json",
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
                            result += `<a href='${searchResult.data.url}'>
                                        <div class='panel panel-default'>
                                            <div class='panel-body'>
                                                <div class='media'>
                                                    <div class='media-left'>`;

                            // if there's no thumbnail
                            if (searchResult.data.thumbnail === "default")
                            {
	                            result += `<img src='${searchResult.data.preview.images[0].source.url}' 
                                                class='media-object' style='width:60px'>`
                            }
                            else
                            {
	                            result += `<img src='${searchResult.data.thumbnail}' 
                                                class='media-object' style='width:60px'>`;
                            }

                            result +=
                                                    `</div>
                                                    <div class='media-body'>
                                                        ${searchResult.data.title}
                                                    </div>
                                                </div>
	                                        </div>
	                                    </div>
                                    </a>`;
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