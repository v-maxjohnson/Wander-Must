$(document).ready(function () {

    var url = window.location.href.split("/");

    // make sure that this is only available on the suitcase-start page
    if (url[url.length - 1] === "suitcase-start") {

        // selecting all items in a category
        $(".all").on("click", function () {

            // variable to hold category of button
            var cat = $(this).data("category");

            // variable to hold current text of button
            var selectText = $(this).text();

            // ternary operator to change text after each click
            selectText === "Select all" ? $(this).text("Unselect all") : $(this).text("Select all");

            // check or uncheck each item in a category based on the text of the button
            $(".form-check-input").each(function () {

                // variable for category of each item
                var catCheck = $(this).data("item-category");

                // only perform the operation on items where the button and item category match
                if (cat === catCheck) {
                    // check all items in a category if the button text is select all, else uncheck all of them 
                    selectText === "Select all" ? $(this).prop('checked', true) : $(this).prop('checked', false);
                }
            });
        });

        // suitcase of user's current suitcase
        var suitcaseId = localStorage.getItem("suitcase_id");

        // click handler to add items to a suitcase
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
                // ajax to pass the ids array to the endpoint and add them for user's current suitcase
                $.ajax({
                    url: "/api/suitcase/" + suitcaseId + "/addItems",
                    type: "post",
                    data: { ids: checkedArray },
                    success: () => {
                        window.location.href = "/suitcase/" + suitcaseId; // redirect to that suitcase upon success
                    }
                })
            };
        });
    };
});