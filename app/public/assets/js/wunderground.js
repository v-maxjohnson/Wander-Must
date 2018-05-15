// **** things needed to address -***
// ISO Country code to WU code conversion hell 
// hooking to DOM/making sure we're on the same page with what div it goes in, how it goes in, etc. 
// https://www.wunderground.com/weather/api/d/docs?d=resources/country-to-iso-matching


$(document).ready(function () {

    // api key for student account on WU, limitations are 500 call/day, and 10 call/minute. 
    var authKey = "c62508752826c7d8";


    // according to country-to-iso matching URL above, UK = GB isocode converted to 'WU code'
    var wuCountry = "GB";
    var city = "London";
    var state = "";
    // formatted for underscores to replace spaces since thats what is acceptable input
    var wuCity = city.replace(/\s+/g, '_');

    var startMonth = "02";
    var startDay = "20";
    var endMonth = "02";
    var endDay = "28";

    
    // differentiating queryURL structure depending on US (needs US/state/city) vs. anywhere else (needs country/city)
    if (isoCountry = "US") {
        var queryURL = "http://api.wunderground.com/api/" + authKey + "/planner_"+ startMonth + startDay + endMonth + endDay + "/q/" + wuCountry + "/" + state + "/" + wuCity + ".json";
    }

    else {
        var queryURL = "http://api.wunderground.com/api/" + authKey + "/planner_"+ startMonth + startDay + endMonth + endDay + "/q/" + wuCountry + "/" + wuCity + ".json";
    }


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

        $(".placeholderclass").append(response.trip.temp_high.avg.F);
        $(".placeholderclass").append(response.trip.temp_high.avg.C);

        $(".placeholderclass").append(response.trip.temp_low.avg.F);
        $(".placeholderclass").append(response.trip.temp_low.avg.C);      

    });

});