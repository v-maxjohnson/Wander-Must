$(document).ready(function () {
    
    var whyMe = window.location.href;
    
    if (whyMe.includes("/profile/")) {
        console.log("Why are you doing this to me")
        var userId = whyMe.slice(30);
        console.log(userId);
        localStorage.setItem("userId", userId);
    } else {
        console.log("yeah i know it's a hack but....")
    }

    if (!req.user) {
        $("#login-dropdown").hide();
        $("#profile-link").show();
    } else {
        $("#login-dropdown").show();
        $("#profile-link").hide();
    }


});