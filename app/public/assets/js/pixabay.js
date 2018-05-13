$(document).ready(function () {

    // api key
    var authKey = "8978514-366287692940ef0d26d86e99b"
    // example entries
    var city = "Austin";
    var country = "United States";

    var queryURL = "https://pixabay.com/api/?key=" + authKey + "&q=" + city + country + "skyline&image_type=photo";

    // ex populated queryURL w/o vars to sift through JSON object
    // https://pixabay.com/api/?key=8978514-366287692940ef0d26d86e99b&q=austin+united+states+skyline&image_type=photo


    $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function (response) {
            console.log(queryURL);
            console.log(response);

            // 1280 px (probably too big to go in suitcase graphic)
            console.log(response.hits[0].largeImageURL);
            // 640 px (feels right, even says webformat)
            console.log(response.hits[0].webformatURL);

            // ****** brainstorming logic to hook to html ****
            if (response.hits[0].webformatURL) {
                $(".suitcaseclass").prepend(response.hits[0].webformatURL);
            } else {
                $(".suitcaseclass").prepend("/assets/images/placeholder.png");
            }

        });
});