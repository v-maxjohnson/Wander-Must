$(document).ready(function () {

    var url = window.location.href.split("/");

    // make sure this is only executed on the suitcase pages
    if (url[url.length - 2] === "suitcase") {

        // format the city name in the suitcase header
        var cityText = $("#suitcase-locale").text().replace(/_/g, ' ');
        $("#suitcase-locale").text(cityText);

        // suitcase id of suitcase page
        var suitcaseApiId = $("#suitcase-nav").data("suitcase_id");

        // suitcase of user's current suitcase
        var suitcaseId = localStorage.getItem("suitcase_id");

        // format dates for suitcase header
        var dateObjOne = $("#suitcase-startDate").text();
        var dateObjTwo = $("#suitcase-endDate").text();
        var momentObjOne = moment(dateObjOne);
        var momentObjTwo = moment(dateObjTwo);
        var suitcaseStartDate = momentObjOne.format('MMM DD, YYYY');
        var suitcaseEndDate = momentObjTwo.format('MMM DD, YYYY');
        $("#suitcase-startDate").text(suitcaseStartDate);
        $("#suitcase-endDate").text(suitcaseEndDate);

        // click handler to add more items to this suitcase (for user who owns this suitcase)
        $("#add-more-items").on("click", function () {
            // set the suitcase id in local storage to this this suitcase
            localStorage.setItem("suitcase_id", suitcaseApiId);
        });

        // click handler to add more items to the user's current suitcase (for user who is visiting this suitcase)
        $("#add-items").on("click", function (event) {
            event.preventDefault();

            // array to hold all checked items
            var checkedArray = [];

            // find each checked item and push it into the array
            $(".form-check-input:checked").each(function () {
                var checked_id = $(this).data("item_id");
                checkedArray.push(checked_id);
            });

            // only execute if user has selected at least one item
            if (checkedArray.length) {
                // ajax to pass the ids array to the endpoint and add them for user's current suitcase (for user who is visiting this suitcase)
                $.ajax({
                    url: "/api/suitcase/" + suitcaseId + "/addItems",
                    type: "post",
                    data: { ids: checkedArray },
                    success: () => {
                        window.location.href = "/suitcase/" + suitcaseId;
                    }
                });
            };
        });

        // click handler to delete an item from this suitcase (for user who owns this suitcase)
        $("body").on("click", ".trash-icon", function (event) {
            event.preventDefault();
            var itemApiId = $(this).data("item_id");
            // ajax to hit endpoint and delete item from suitcase
            $.ajax({
                url: "/api/suitcase/" + suitcaseApiId + "/" + itemApiId,
                type: "DELETE"
            })
                .then(buildItems); // call function to render items again with deleted items gone
        });

        // variables to check the user's id in locale storage against the id of the current suitcase and thus change the context accordingly
        var userCheckOne = localStorage.getItem("user_id");
        var userCheckTwo = $("#suitcase-user").data("user-id");

        // click handler for city in header to start another search. if the user is on their own suitcase, set localstorage to store user's suitcase id. If user is on someone else's suitcase, their current suitcase id will remain in local storage
        $("#suitcase-locale").on("click", function () {
            if (parseInt(userCheckOne) === parseInt(userCheckTwo)) {
                localStorage.setItem("suitcase_id", suitcaseApiId);
            }
        });

        // function to dynamically build suitcase items
        function buildItems() {
            // empty all rows
            $(".cat-row").empty();

            //ajax to get all items in the current suitcase
            $.get("/api/suitcase/" + suitcaseApiId, function (dbSuitcase) {
                if (dbSuitcase.Items) { // check for response

                    // if number of items in response is greater than zero, execute the following
                    if (dbSuitcase.Items.length !== 0) {

                        // build the item inputs with checkmarks for each item that comes back and trashcans for deleting items
                        for (var i = 0; i < dbSuitcase.Items.length; i++) {

                            // variable declarations to create checkmarks, labels, and trash cans
                            var formCheck = $("<div>");
                            formCheck.addClass("form-check offset-1 col-5 col-lg-3");
                            var formLabel = $("<label>");
                            var formInput = $("<input class='form-check-input' type='checkbox' checked='checked' />").attr("data-item_id", dbSuitcase.Items[i].id);
                            var spans = $("<span class='form-check-sign'><span class='check'></span></span>");
                            var trashSpan = $("<span class='fa fa-trash trash-icon'>&nbsp;</span>").attr("data-item_id", dbSuitcase.Items[i].id);

                            // if user is on another user's suitcase, create checkmarks and labels and hide the button to take user to general item list
                            if (parseInt(userCheckOne) !== parseInt(userCheckTwo)) {
                                formLabel.addClass("form-check-label").text(dbSuitcase.Items[i].item_name);
                                formLabel.append(formInput).append(spans);
                                formCheck.append(formLabel);
                                $("#add-more-items-holder").hide();
                            } else { // if user is on own page, create trash cans and labels and hide the button to add the items on this page
                                formLabel.addClass("non-click-label").text(dbSuitcase.Items[i].item_name);
                                formCheck.append(trashSpan).append(formLabel);
                                $("#add-items").hide();
                            }

                            // switch to handle where the items should append, based on their category
                            switch (dbSuitcase.Items[i].item_category) {
                                case "toiletries":
                                    $("#toiletries").append(formCheck);
                                    break;
                                case "clothing":
                                    $("#clothing").append(formCheck);
                                    break;
                                case "accessories":
                                    $("#accessories").append(formCheck);
                                    break;
                                case "electronics":
                                    $("#electronics").append(formCheck);
                                    break;
                            }
                        }
                    } else { // if the suitcase is empty, hide the button that allows visitors to add items
                        $("#add-items").hide();
                    }
                }
            });
        }
        // initial call to render items
        buildItems();
    }
});