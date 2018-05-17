// **** things needed to address -***
// hooking to DOM/making sure we're on the same page with what div it goes in, how it goes in, etc. 


$(document).ready(function () {

    // api key for student account on WU, limitations are 500 call/day, and 10 call/minute. 
    var authKey = "c62508752826c7d8";


    var location = $(this).attr("data-location");
    var locationArray = [];
    locationArray = location.split(", ");
    var city = locationArray[0];
    var state = locationArray[1];
    var country = locationArray[2];

    // formatted for underscores to replace spaces since thats what is acceptable input
    var wuCity = city.replace(/\s+/g, '_');
    var wuCountry = country.replace(/\s+/g, '_');
    var wuState = state.replace(/\s+/g, '_');


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

    
    // differentiating queryURL structure depending on US (needs US/state/city) vs. anywhere else (needs country/city)
    if (country = "USA") {
        var queryURL = "http://api.wunderground.com/api/" + authKey + "/planner_"+ startMonth + startDay + endMonth + endDay + "/q/" + wuState + "/" + wuCity + ".json";
    }

    else {
        var queryURL = "http://api.wunderground.com/api/" + authKey + "/planner_"+ startMonth + startDay + endMonth + endDay + "/q/" + wuCountry + "/" + wuCity + ".json";
    }


    // ex populated queryURL to sift through JSON, observe US/CA/San_Francisco.json vs UK/London.json differences 
    // queryURL http://api.wunderground.com/api/c62508752826c7d8/planner_02200228/q/CA/San_Francisco.json
    

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function (response) {
    
        if (response.trip.temp_high.avg.F !== "") {
        $(".placeholderclass").text("High Avg Temperature: " + response.trip.temp_high.avg.F + "&deg; Fahrenheit");
        $(".placeholderclass").text("High Avg Temperature: " + response.trip.temp_high.avg.C + "&deg; Celcius");

        $(".placeholderclass").text("Low Avg Temperature: " + response.trip.temp_low.avg.F + "&deg; Fahrenheit");
        $(".placeholderclass").text("Low Avg Temperature: " + response.trip.temp_low.avg.C + "&deg; Celcius");  
        }
        
        else {
            $(".placeholderclass").text("Data is not available for this city");
        }

    });

});