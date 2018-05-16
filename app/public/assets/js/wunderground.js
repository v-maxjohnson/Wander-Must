// **** things needed to address -***
// hooking to DOM/making sure we're on the same page with what div it goes in, how it goes in, etc. 


$(document).ready(function () {

    // api key for student account on WU, limitations are 500 call/day, and 10 call/minute. 
    var authKey = "c62508752826c7d8";


    var country = "United Kingdom";
    var city = "London";
    // example of picking US queryURL if you change var country to 'United States' (since there's a London, OH)
    var state = "Ohio";
    // formatted for underscores to replace spaces since thats what is acceptable input
    var wuCity = city.replace(/\s+/g, '_');
    var wuCountry = country.replace(/\s+/g, '_');
    var wuState = state.replace(/\s+/g, '_');

    var startMonth = "02";
    var startDay = "20";
    var endMonth = "02";
    var endDay = "28";

    
    // differentiating queryURL structure depending on US (needs US/state/city) vs. anywhere else (needs country/city)
    if (country = "United States") {
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