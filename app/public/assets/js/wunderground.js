$(document).ready(function () {

    // api key for student account on WU, limitations are 500 call/day, and 10 call/minute. 
    var authKey = "c62508752826c7d8";

    let id = $(this).attr("data-id");

    var location = $(this).attr("data-location");
    
    var city = $(this).attr("data-city");
    var admin = $(this).attr("data-admin");
    var country = $(this).attr("data-country");

    // formatted for underscores to replace spaces since thats what is acceptable input
    var wuCity = city.replace(/\s+/g, '_');
    var wuCountry = country.replace(/\s+/g, '_');
    var wuAdmin = admin.replace(/\s+/g, '_');


    // pick out start and end date from data attributes, put in array, and pick out per index 
    var startDate = $(this).attr("data-start");
    var startDateArray = [];
    startDateArray = startDate.split("-");
    var startMonth = startDateArray[0];
    var startDay = startDateArray[1];

    var endDate = $(this).attr("data-end");
    var endDateArray = [];
    endDateArray = endDate.split("-");
    var endMonth = endDateArray[0];
    var endDay = endDateArray[1];


    // differentiating queryURL structure depending on USA (needs state/city) vs. anywhere else (needs country/city)
    if (country = "USA") {
        var queryURL = "http://api.wunderground.com/api/" + authKey + "/planner_" + startMonth + startDay + endMonth + endDay + "/q/" + wuAdmin + "/" + wuCity + ".json";
    } else {
        var queryURL = "http://api.wunderground.com/api/" + authKey + "/planner_" + startMonth + startDay + endMonth + endDay + "/q/" + wuCountry + "/" + wuCity + ".json";
    }

    $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function (response) {

            if (response.trip.temp_high.avg.F !== "") {
                $(".placeholderclass").html("High Avg Temperature: " + response.trip.temp_high.avg.F + "&deg; Fahrenheit");
                $(".placeholderclass").html("High Avg Temperature: " + response.trip.temp_high.avg.C + "&deg; Celcius");

                $(".placeholderclass").html("Low Avg Temperature: " + response.trip.temp_low.avg.F + "&deg; Fahrenheit");
                $(".placeholderclass").html("Low Avg Temperature: " + response.trip.temp_low.avg.C + "&deg; Celcius");
            } else {
                $(".placeholderclass").text("Data is not available for this city");
            }

        });

});