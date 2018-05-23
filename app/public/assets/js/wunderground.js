$(document).ready(function () {
    var url = window.location.href.split("/");
    if (url[url.length - 2] === "suitcase") {
        // api key for student account on WU, limitations are 500 call/day, and 10 call/minute. 
        var authKey = "c62508752826c7d8";

        var wuCity = $("#suitcase-locale").attr("data-city");
        var wuAdmin = $("#suitcase-locale").attr("data-admin");
        var wuCountry = $("#suitcase-locale").attr("data-country");

        // pick out start and end date from data attributes, put in array, and pick out per index 
        var startDate = $("#suitcase-startDate").attr("data-start");
        var startDateArray = [];
        startDateArray = startDate.split("-");
        var startMonth = startDateArray[0];
        var startDay = startDateArray[1];

        var endDate = $("#suitcase-endDate").attr("data-end");
        var endDateArray = [];
        endDateArray = endDate.split("-");
        var endMonth = endDateArray[0];
        var endDay = endDateArray[1];


        // differentiating queryURL structure depending on USA (needs state/city) vs. anywhere else (needs country/city)
        if (wuCountry === "usa") {
            var queryURL = "https://api.wunderground.com/api/" + authKey + "/planner_" + startMonth + startDay + endMonth + endDay + "/q/" + wuAdmin + "/" + wuCity + ".json";
        } else {
            var queryURL = "https://api.wunderground.com/api/" + authKey + "/planner_" + startMonth + startDay + endMonth + endDay + "/q/" + wuCountry + "/" + wuCity + ".json";
        }

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {

                if (response.trip.temp_high.avg.F !== "") {
                    $("#highF").html("High Avg: " + response.trip.temp_high.avg.F + "&deg; F");
                    $("#highC").html("High Avg: " + response.trip.temp_high.avg.C + "&deg; C");

                    $("#lowF").html("Low Avg: " + response.trip.temp_low.avg.F + "&deg; F");
                    $("#lowC").html("Low Avg: " + response.trip.temp_low.avg.C + "&deg; C");
                } else {
                    $("#weather").text("Data is not available for this city");
                }

            });
    }
});