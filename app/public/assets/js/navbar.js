$(document).ready(function () {
    if (!req.user) {
        $("#login-dropdown").hide();
        $("#profile-link").show();
    } else {
        $("#login-dropdown").show();
        $("#profile-link").hide();
    }


});