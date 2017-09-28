/**
 * Created by User on 27.09.2017.
 */
$(document).ready(function () {
    $("#btnRedditAccio").click(function(){

        $("#searchResults").html("<p>Loading... Please wait.</p>");
        let searchTerm = $("#searchTerm").val();
        let result = "";
        $.ajax(
            "https://www.reddit.com/search.json",
            {
                data: { q: searchTerm }, // what are we looking for

                success: function(responseData)
                {
                    if (responseData.data.children.length > 0)
                    {
                        // we print results (each one is wrapped in 'panel' and 'media' tags)
                        let wrappedItems = responseData.data.children.map(wrapElements);

                        // how many results we have found + all results wrapped in proper tags
                        result = `<p># of results: ${responseData.data.children.length}</p>
                                    ${wrappedItems.join('')}`;
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

function wrapElements(element, index, array)
{
    let thumbnail; //this will be the pic

    // if there's no thumbnail we use this pic
    if (element.data.thumbnail === "default")
    {
        thumbnail = `<img src='${element.data.preview.images[0].source.url}' 
                        class='media-object' style='width:60px'>`
    }
    // else we use a thumbnail
    else
    {
        thumbnail = `<img src='${element.data.thumbnail}' 
                        class='media-object' style='width:60px'>`;
    }

    // what tags we are wrapping elements in
    let wrappedElement = `<a href='${element.data.url}'>
                    <div class='panel panel-default'>
                        <div class='panel-body'>
                            <div class='media'>
                                <div class='media-left'>
                                    ${thumbnail}
                                </div>
                                <div class='media-body'>
                                    ${element.data.title}
                                </div>
                            </div>
                        </div>
                    </div>
                </a>`;
    return wrappedElement;
}