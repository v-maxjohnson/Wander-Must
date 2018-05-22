$(document).ready(function () {
    
    var whyMe = window.location.href;
    
    if (whyMe.includes("/profile/")) {
        console.log("Why are you doing this to me");
        var user_id = whyMe.slice(30);
        console.log(user_id);
        localStorage.setItem("user_id", user_id);
    } else {
        console.log("yeah i know it's a hack but....");
    }

    var user = localStorage.getItem("user_id");
    
    if (user) {
        $("#login-dropdown").hide();
        $("#profile-link").show();
        $("#suitcase-link").show();
    } else {
        $("#login-dropdown").show();
        $("#profile-link").hide();
        $("#suitcase-link").hide();
    }

});