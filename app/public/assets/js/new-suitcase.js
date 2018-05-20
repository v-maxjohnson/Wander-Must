

// When user clicks new-suitcase-btn
$("#new-suitcase-btn").on("click", function (event) {
    event.preventDefault();

    var startDate = $("#start-date").val();
    var endDate = $("#end-date").val();
    var startDateObj = new Date(startDate);
    var endDateObj = new Date(endDate);
    var momentObjOne = moment(startDateObj);
    var momentObjTwo = moment(endDateObj);
    startDate = momentObjOne.format('YYYY-MM-DD');
    endDate = momentObjTwo.format('YYYY-MM-DD');

    var location = $("#suitcase-city").val().trim().toLowerCase();
    var locationArray = [];
    locationArray = location.split(", ");
    
    var newLocale = {
        locale_city: locationArray[0],
        locale_admin: locationArray[1],
        locale_country: locationArray[2]      
    }

    var newSuitcase = {
        start_date: startDate,
        end_date: endDate,
        travel_category: $("#travelselect").val().trim()
    };

    console.log(newLocale, newSuitcase);

    // Send an AJAX POST-request with jQuery
    $.post("/api/locale", newLocale) 
        // On success, run the following code
        .then(function (dbLocale) {
            localStorage.setItem("newSuitcase", JSON.stringify(newSuitcase));
            window.location.href = "/search/" + dbLocale.locale_city;
        });

    
});