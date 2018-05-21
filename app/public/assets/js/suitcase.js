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

var url = window.location.href.split("/");
var id = url[url.length - 1];

$.get("/api/suitcase/" + id, function (dbSuitcase) {
    if (dbSuitcase.Items.length !== 0) {

        for (var i = 0; i < dbSuitcase.Items.length; i++) {

            var formCheck = $("<div>");
            formCheck.addClass("form-check offset-1 col-5 col-lg-3");
            var formLabel = $("<label>");
            formLabel.addClass("form-check-label").text(dbSuitcase.Items[i].item_name);
            var formInput = $("<input class='form-check-input' type='checkbox' checked />");
            var spans = $("<span class='form-check-sign'><span class='check'></span></span>");


            formLabel.append(formInput).append(spans);
            formCheck.append(formLabel);

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

});