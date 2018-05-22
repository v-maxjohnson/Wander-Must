$(document).ready(function () {
    var currentSuitcase = parseInt(localStorage.getItem("suitcase_id"));
    $(".suitcase-partial").each(function () {
        if (parseInt($(this).data("id")) === currentSuitcase) {
            $(this).hide();
        }
    });
});