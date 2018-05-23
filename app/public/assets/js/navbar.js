$(document).ready(function () {

    var whyMe = window.location.href;

    if (whyMe.includes("/profile/")) {
        var user_id = whyMe.slice(42);
        localStorage.setItem("user_id", user_id);
    }

    var user = localStorage.getItem("user_id");

    if (user) {
        $("#login-dropdown").hide();
        $("#profile-link").show();
        $("#suitcase-link").show();
        $("#logout").show();
    } else {
        $("#login-dropdown").show();
        $("#profile-link").hide();
        $("#suitcase-link").hide();
        $("#logout").hide();
    }

    $("#profile-link-button").attr("href", "/profile/" + user);

});