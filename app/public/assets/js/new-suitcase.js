

// When user clicks new-suitcase-btn
$("#new-suitcase-btn").on("click", function (event) {
    event.preventDefault();

    var startDate = moment($("#start-date").val(), "MM-DD-YYYY");
    var endDate = moment($("#end-date").val(), "MM-DD-YYYY");
    var location = $("#suitcase-city").val().trim().toLowerCase();
    var locationArray = [];
    locationArray = location.split(", ");
    var newLocale = {
        locale_city: locationArray[0],
        locale_admin: locationArray[1],
        locale_country: locationArray[2]      
    }

    var newSuitcase = {
        start_date: startDate._i,
        end_date: endDate._i,
        travel_category: $("#travelselect").val().trim()
    };

    console.log(newLocale, newSuitcase);

    // Send an AJAX POST-request with jQuery
    $.post("/api/suitcases", newLocale, newSuitcase)
        // On success, run the following code
        .then(function () {
            // window.location.href = "/search/:locale";
        });

    
});