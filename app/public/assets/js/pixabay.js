$(document).ready(function () {

    // get the suitcase id of each suitcase, apply background pic call to each, and set query variables
    $(".suitcasePhoto").each(function () {
        let id = $(this).attr("data-id");
        var authKey = "8978514-366287692940ef0d26d86e99b";

        // pick out city/state/country from data attributes, put in array, and pick out per index 
        var city = $(this).attr("data-city");
        var country = $(this).attr("data-country");

        // replace underscores with '+' as acceptable input
        var pixaCity = city.replace(/\s_/g, '+');
        var pixaCountry = country.replace(/\s_/g, '+');

        var queryURL = "https://pixabay.com/api/?key=" + authKey + "&q=" + pixaCity + "+" + pixaCountry + "+skyline&image_type=photo";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(response => {

                if (response.hits[0].webformatURL) { // if something is returned, set image source
                    $(this).attr("src", response.hits[0].webformatURL);
                } else { // else use a default
                    $(this).attr("src", "/assets/img/bg7.jpg");
                }
            });
    });


});