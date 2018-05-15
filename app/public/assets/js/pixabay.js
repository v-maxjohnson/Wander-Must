$(document).ready(function () {
    $(".suitcasePhoto").each(function () {
        let id = $(this).attr("data-id");
        var authKey = "8978514-366287692940ef0d26d86e99b";
        // example entries
        var city = "Austin";
        var country = "United States";
        // separate sp
        var pixaCity = city.replace(/\s+/g, '+');
        var pixaCountry = country.replace(/\s+/g, '+');

        var queryURL = "https://pixabay.com/api/?key=" + authKey + "&q=" + pixaCity + "+" + pixaCountry + "+skyline&image_type=photo";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(response => {
                if (response.hits[0].webformatURL) {
                    $(this).attr("src", response.hits[0].webformatURL);
                } else {
                    $(this).attr("src", "/assets/img/bg7.jpg");
                }
            });
    });
});