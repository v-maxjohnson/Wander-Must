$(document).ready(function () {

    // clear out new suitcase values when modal opens
    $("#suitcase-link, #blank-suitcase").on("click", function () {
        $("#suitcase-city, #travelselect, #start-date, #end-date").val(""); 
    });

    // click handler when user clicks new-suitcase-btn
    $("#new-suitcase-btn").on("click", function (event) {
        event.preventDefault();

        // store form input values in variables
        var travelSelect = $("#travelselect").val();
        var startDate = $("#start-date").val();
        var endDate = $("#end-date").val();
        var location = $("#suitcase-city").val().trim().toLowerCase().replace(/\s+-\s+/g, ', ');
        location = location.replace(/\s+/g, '_'); // replace spaces with underscores

        // make sure the input isn't blank
        if (travelSelect !== "" && startDate !== "" && endDate !== "" && location !== "") {

            // format dates for db using Moment
            var startDateObj = new Date(startDate);
            var endDateObj = new Date(endDate);
            var momentObjOne = moment(startDateObj);
            var momentObjTwo = moment(endDateObj);
            startDate = momentObjOne.format('YYYY-MM-DD');
            endDate = momentObjTwo.format('YYYY-MM-DD');

            // create array to hold locale values
            var locationArray = [];

            // create a temporary array for the australia fix below
            var tempArray = [];

            // separate the locale values by comma & underscore and put them in the array 
            locationArray = location.split(",_");

            // if the location is in australia, there is no delimiter between city and state except a space, so it enters as one value. split that value into 2 and create a location array that matches the other formatting 
            if (locationArray[locationArray.length - 1] === "australia") {
                // locationArray[2] = tempArray[2];
                tempArray = locationArray[0].split("_");
                locationArray[0] = tempArray[0];
                locationArray[1] = tempArray[1];
                locationArray[2] = "australia";
            }

            // locale object declaration
            var newLocale;

            // logic to handle how different countries list their cities on google and make sure data formatting is consistent and create locale object
            if (locationArray.length === 3) {
                newLocale = {
                    locale_city: locationArray[0],
                    locale_admin: locationArray[1],
                    locale_country: locationArray[2]
                };
            } else if (locationArray.length > 3) {
                newLocale = {
                    locale_city: locationArray[0],
                    locale_admin: locationArray[locationArray.length - 2],
                    locale_country: locationArray[locationArray.length - 1]
                };
            } else {
                newLocale = {
                    locale_city: locationArray[0],
                    locale_admin: locationArray[1],
                    locale_country: locationArray[1]
                };
            }

            // new suitcase object declaration
            var newSuitcase;

            // AJAX post request with new locale to api endpoint
            $.post("/api/locale", newLocale)
                // On success, run the following code
                .then(function (dbLocale) {
                    // get back the new locale object and then add the id to the new suitcase object as well as the user input
                    newSuitcase = {
                        start_date: startDate,
                        end_date: endDate,
                        travel_category: travelSelect,
                        user_id: localStorage.getItem("user_id"),
                        locale_id: dbLocale.id
                    };

                    // AJAX post request with new suitcase to api endpoint
                    $.post("/api/suitcases", newSuitcase)
                        // On success, run the following code
                        .then(function (dbSuitcase) {

                            // reset localstorage to hold new suitcase id
                            localStorage.removeItem("suitcase_id");
                            localStorage.setItem("suitcase_id", dbSuitcase.id);

                            // check to see if there are any cities with a suitcase
                            if (dbSuitcase.hadPreviousSuitcases) { // if so, redirect to display other suitcases with that city
                                window.location.href = "/search/" + dbLocale.locale_city;
                            }
                            else { // else redirect to the add items page
                                window.location.href = "/suitcase-start";
                            }
                        });
                });
        }
    });
});