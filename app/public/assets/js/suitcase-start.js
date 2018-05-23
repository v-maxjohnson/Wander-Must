$(document).ready(function () {

    var url = window.location.href.split("/");

    // make sure that this is only available on the suitcase-start page
    if (url[url.length - 1] === "suitcase-start") {

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

            // ajax to pass the ids array to the endpoint and add them for user's current suitcase
            $.ajax({
                url: "/api/suitcase/" + suitcaseId + "/addItems",
                type: "post",
                data: { ids: checkedArray },
                success: () => {
                    window.location.href = "/suitcase/" + suitcaseId; // redirect to that suitcase upon success
                }
            })
        });
    };
});