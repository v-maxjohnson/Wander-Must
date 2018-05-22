$(document).ready(function () {

    var url = window.location.href.split("/");

    if (url[url.length - 2] === "suitcase") {

        // suitcase id of current suitcase
        var suitcaseApiId = $("#suitcase-nav").data("suitcase_id");

        // suitcase of current user's suitcase
        var suitcaseId = localStorage.getItem("suitcase_id");

        var dateObjOne = $("#suitcase-startDate").text();
        var dateObjTwo = $("#suitcase-endDate").text();

        var momentObjOne = moment(dateObjOne);
        var momentObjTwo = moment(dateObjTwo);

        var suitcaseStartDate = momentObjOne.format('MMM DD, YYYY');
        var suitcaseEndDate = momentObjTwo.format('MMM DD, YYYY');
        $("#suitcase-startDate").text(suitcaseStartDate);
        $("#suitcase-endDate").text(suitcaseEndDate);

        $("#add-items").on("click", function (event) {
            event.preventDefault();

            var checkedArray =[];
            
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
                    window.location.href = "/suitcase/" + suitcaseId;
                }
            });
           
        });

        $("body").on("click", ".trash-icon", function (event) {
            event.preventDefault();
            var itemApiId = $(this).data("item_id");
            $.ajax({
                url: "/api/suitcase/" + suitcaseApiId + "/" + itemApiId,
                type: "DELETE"
            })
                .then(buildItems);

        });

        function buildItems() {
            $(".cat-row").empty();
            $.get("/api/suitcase/" + suitcaseApiId, function (dbSuitcase) {
                if (dbSuitcase.Items) {
                    if (dbSuitcase.Items.length !== 0) {

                        for (var i = 0; i < dbSuitcase.Items.length; i++) {

                            var formCheck = $("<div>");
                            formCheck.addClass("form-check offset-1 col-5 col-lg-3");
                            var formLabel = $("<label>");
                            var formInput = $("<input class='form-check-input' type='checkbox' checked='checked' />").attr("data-item_id", dbSuitcase.Items[i].id);
                            var spans = $("<span class='form-check-sign'><span class='check'></span></span>");
                            var trashSpan = $("<span class='fa fa-trash trash-icon'>&nbsp;</span>").attr("data-item_id", dbSuitcase.Items[i].id);
                            var userCheckOne = localStorage.getItem("user_id");
                            var userCheckTwo = $("#suitcase-user").data("user-id");

                            if (parseInt(userCheckOne) !== parseInt(userCheckTwo)) {
                                formLabel.addClass("form-check-label").text(dbSuitcase.Items[i].item_name);
                                formLabel.append(formInput).append(spans);
                                formCheck.append(formLabel);
                            } else {
                                formLabel.addClass("non-click-label").text(dbSuitcase.Items[i].item_name);
                                formCheck.append(trashSpan).append(formLabel);
                                $("#add-items").hide();
                            }

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
                                    return;
                                    break;
                            }
                        }
                    }
                }
            });
        }
    buildItems();
    }
});