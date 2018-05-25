// click handler to log user out, clear localstorage, & redirect to the index
$(document).ready(function () {
    $("#logout-btn").on("click", function (event) {
        event.preventDefault();

        $.get("/logout")

        .then(function () {
        localStorage.clear();
        window.location.href = "/";
    });
    });
});