$(document).ready(function () {

    var url = window.location.href.split("/");
    if (url[url.length - 2] === "suitcase") { 

    var dateObjOne = $("#suitcase-startDate").text();
    var dateObjTwo = $("#suitcase-endDate").text();
    console.log(dateObjOne);

    var momentObjOne = moment(dateObjOne);
    var momentObjTwo = moment(dateObjTwo);

    var suitcaseStartDate = momentObjOne.format('MMM DD, YYYY');
    var suitcaseEndDate = momentObjTwo.format('MMM DD, YYYY');
    $("#suitcase-startDate").text(suitcaseStartDate);
    $("#suitcase-endDate").text(suitcaseEndDate);

    $("#add-item").on("click", function (event) {
        event.preventDefault();

        // Make a newChirp object
        var newItem = {
            item_name: $("#item-name").val().trim(),
            item_category: $("#item-category").val().trim()
        };

        console.log(newItem);

        $.post("/api/items", newChirp)
            // On success, run the following code
            .then(function () {

                var row = $("<div>");
                row.addClass("chirp");

                row.append("<p>" + newChirp.author + " chirped: </p>");
                row.append("<p>" + newChirp.body + "</p>");
                row.append("<p>At " + moment(newChirp.created_at).format("h:mma on dddd") + "</p>");

                $("#chirp-area").prepend(row);

            });

        // Empty each input box by replacing the value with an empty string
        $("#author").val("");
        $("#chirp-box").val("");
    });

    var suitcaseApiId = url[url.length - 1];

    $.get("/api/suitcase/" + suitcaseApiId, function (dbSuitcase) {
        if (dbSuitcase.Items) {
            if (dbSuitcase.Items.length !== 0) {

                for (var i = 0; i < dbSuitcase.Items.length; i++) {

                    var formCheck = $("<div>");
                    formCheck.addClass("form-check offset-1 col-5 col-lg-3");
                    var formLabel = $("<label>");
                    formLabel.addClass("form-check-label").text(dbSuitcase.Items[i].item_name);
                    var formInput = $("<input class='form-check-input' type='checkbox' checked />");
                    var spans = $("<span class='form-check-sign'><span class='check'></span></span>");
                    var trashSpan = $("<span class='fa fa-trash trash-icon'>&nbsp;</span>")


                    formLabel.append(formInput).append(spans);
                    formCheck.append(trashSpan).append(formLabel);

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
    };
});