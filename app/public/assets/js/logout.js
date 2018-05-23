// click handler to log user out, clear localstorage, & redirect to the index
$(document).ready(function () {
    $("#logout-btn").on("click", function (event) {
        event.preventDefault();

        localStorage.clear();
        window.location.href = "/";

    });
});