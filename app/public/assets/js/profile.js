$(document).ready(function () {
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