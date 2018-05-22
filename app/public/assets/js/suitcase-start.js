$(document).ready(function () {

    var url = window.location.href.split("/");

    if (url[url.length - 1] === "suitcase-start") {

        // suitcase of current user's suitcase
        var suitcaseId = localStorage.getItem("suitcase_id");

        $("#add-items").on("click", function (event) {
            event.preventDefault();

            var checkedArray = [];
            
            $(".form-check-input:checked").each(function () {
                var checked_id = $(this).data("item_id");
                checkedArray.push(checked_id);
            });

            console.log(checkedArray);
            $.ajax({
                url: "/api/suitcase/" + suitcaseId + "/addItems",
                type: "post",
                data: { ids: checkedArray },
                success: () => {
                    window.location.href = "/suitcase/" + suitcaseId
                }
            })
        });
    };
});