$(document).ready(function () {

    $(".suitcase-title").each(function () {
        var cityText = $(this).data("city").replace(/_/g, ' ');
        $(this).text(cityText);
    });

    $(".travel-dates").each(function () {

        var dateString = $(this).text();
        var dateArray = [];
        dateArray = dateString.split(" - ");

        var dateObjOne = dateArray[0];
        var dateObjTwo = dateArray[1];

        var momentObjOne = moment(dateObjOne);
        var momentObjTwo = moment(dateObjTwo);

        var momentString = momentObjOne.format('MMM DD, YYYY') + " - " + momentObjTwo.format('MMM DD, YYYY');
        $(this).text(momentString);
    });
});

$.get("/loggedIn")

    .then(function (dbUser) {
        localStorage.getItem("user_id", dbUser.id);
        window.location.href = "/profile/" + dbUser.id;
    });