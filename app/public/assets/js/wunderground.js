// **** things needed to address -***
// 30 day span is *only* acceptable duration to return results, anymore and we get an error response in object
// ^ do we want to display the error in object telling end user, or something to round it to 30 days out from start date for results of a related-weather overview?
// do we want anything else picked out of the object period, like cloud coverage description or?
// ISO Country code to WU code conversion hell last but not least of the worries 
// https://www.wunderground.com/weather/api/d/docs?d=resources/country-to-iso-matching


$(document).ready(function () {

    // api key for student account on WU, limitations are 500 call/day, and 10 call/minute. 
    var authKey = "c62508752826c7d8";


    var isoCountry = "UK";
    var city = "London";
    var state = "";
    // formatted for underscores to replace spaces since thats what is acceptable input
    var wuCity = city.replace(/\s+/g, '_');

    var startMonth = "02";
    var startDay = "20";
    var endMonth = "02";
    var endDay = "28";

    
    // pseudocoding logic for US vs others for queryURL structure, and F vs C concerns 
    // if (isoCountry = "US") {
    //     var queryURL = "http://api.wunderground.com/api/" + authKey + "/planner_"+ startMonth + startDay + endMonth + endDay + "/q/" + isoCountry + "/" + state + "/" + wuCity + ".json";
    //     console.log(response.trip.temp_high.avg.F);
    //     console.log(response.trip.temp_low.avg.F);
    // }

    // else {
    //     var queryURL = "http://api.wunderground.com/api/" + authKey + "/planner_"+ startMonth + startDay + endMonth + endDay + "/q/" + isoCountry + "/" + wuCity + ".json";
    //     console.log(response.trip.temp_high.avg.C);
    //     console.log(response.trip.temp_low.avg.C);
    // }

    var queryURL = "http://api.wunderground.com/api/" + authKey + "/planner_"+ startMonth + startDay + endMonth + endDay + "/q/" + isoCountry + "/" + wuCity + ".json";


    // ex populated queryURL to sift through JSON, observe US/CA/San_Francisco.json vs UK/London.json differences 
    // queryURL http://api.wunderground.com/api/c62508752826c7d8/planner_02200228/q/US/CA/San_Francisco.json
    

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function (response) {
        console.log(queryURL);
        console.log(response);

        // planner's temperature high average in F and C
        console.log(response.trip.temp_high.avg.F);
        console.log(response.trip.temp_high.avg.C);

        // planner's temp low in F and C
        console.log(response.trip.temp_low.avg.F);
        console.log(response.trip.temp_low.avg.C);

        


    });

});