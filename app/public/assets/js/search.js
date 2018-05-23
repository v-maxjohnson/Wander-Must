$(document).ready(function () {
    var currentSuitcase = parseInt(localStorage.getItem("suitcase_id"));
    var url = window.location.href.split("/");

    if (url[url.length - 2] === "search") {

        $(".suitcase-partial").each(function () {
            if (parseInt($(this).data("id")) === currentSuitcase) {
                $(this).hide();
            }
        });
    };
    var cityText = $(".locale-city").text().replace(/_/g, ' ');
    $(".locale-city").text(cityText);
});