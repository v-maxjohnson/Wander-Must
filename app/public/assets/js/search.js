$(document).ready(function () {

    // get id of user's current suitcase from localstorage
    var currentSuitcase = parseInt(localStorage.getItem("suitcase_id"));

    // make sure this function only happens on the city searches
    var url = window.location.href.split("/");

    if (url[url.length - 2] === "search") {

        $(".suitcase-partial").each(function () {

            // don't show a user's current suitcase in the search results for that city
            if (parseInt($(this).data("id")) === currentSuitcase) {
                $(this).hide();
            }
        });

        // if current suitcase is the only suitcase with the current city, redirect to add more items page 
        if ($(".suitcase-partial:visible").length === 0) {
            window.location.href = "/suitcase-start";
        }
    };

    // format the city name at the top of the search results
    var cityText = $(".locale-city").text().replace(/_/g, ' ');
    $(".locale-city").text(cityText);
});