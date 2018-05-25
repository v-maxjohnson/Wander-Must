$(document).ready(function () {

    var url = window.location.href.split("/");

    if (url[url.length - 2] === "profile") {
        var user_id = url[url.length - 1];
        localStorage.setItem("user_id", user_id);
    }

    // get user id from localstorage
    var user = localStorage.getItem("user_id");

    // change context of navbar based on whether the user is logged in or not
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

    // change href of profile link to take user to their profile
    $("#profile-link-button").attr("href", "/profile/" + user);

});