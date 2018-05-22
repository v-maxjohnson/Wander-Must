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
    console.log(locationArray);

    var newLocale;
    if (locationArray.length === 3) {
        newLocale = {
            locale_city: locationArray[0],
            locale_admin: locationArray[1],
            locale_country: locationArray[2]
        };
    } else if (locationArray.length > 3) {
        newLocale = {
            locale_city: locationArray[0],
            locale_admin: locationArray[locationArray.length-2],
            locale_country: locationArray[locationArray.length-1]
        };
    } else {
        newLocale = {
            locale_city: locationArray[0],
            locale_admin: locationArray[1],
            locale_country: locationArray[1]
        };
    }
    

    var newSuitcase;
    
    

    $.post("/api/locale", newLocale)
        // On success, run the following code
        .then(function (dbLocale) {
            newSuitcase = {
                start_date: startDate,
                end_date: endDate,
                travel_category: $("#travelselect").val().trim(),
                user_id: localStorage.getItem("user_id"),
                locale_id: dbLocale.id
            };

            // Send an AJAX POST-request with jQuery
            $.post("/api/suitcases", newSuitcase)
                // On success, run the following code
                .then(function (dbSuitcase) {
                    localStorage.setItem("suitcase_id", dbSuitcase.id);
                    if (!dbSuitcase.hadPreviousSuitcases ) {
                        window.location.href = "/search/" + dbLocale.locale_city;
                    }
                    else {
                        window.location.href = "/suitcase-start";
                    }
                });
        });

});