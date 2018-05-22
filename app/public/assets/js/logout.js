$("#logout-btn").on("click", function (event) {
    event.preventDefault();

    localStorage.clear()
    .then(
        window.location.href="/"
    );
});