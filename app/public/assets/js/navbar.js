$(document).ready(function () {

    var url = window.location.href.split("/");

    if (url[url.length - 2] === "profile") {
        var user_id = url[url.length - 1];
        localStorage.setItem("user_id", user_id);
        var profile_username = $("#profile-user-name").text();
        localStorage.setItem("user_name", profile_username);
    }

    // get user id from localstorage
    var user = localStorage.getItem("user_id");

    // get user name from localstorage
    var name = localStorage.getItem("user_name");

    // change context of navbar based on whether the user is logged in or not
    if (user) {
        $("#login-dropdown").hide();
        $("#profile-link, #suitcase-link, #logout, #user-name-link").show();
        $("#user-name-text").text("Hello, " + name + "!");
    } else {
        $("#login-dropdown").show();
        $("#profile-link, #suitcase-link, #logout, #user-name-link").hide();
    }

    // change href of profile link to take user to their profile
    $("#profile-link-button").attr("href", "/profile/" + user);

});