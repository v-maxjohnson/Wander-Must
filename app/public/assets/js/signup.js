// ddslick menu options
var avatarOps = [
    {
        text: "pig",
        value: "/assets/img/faces/pig.png",
        selected: false,
        description: "You travel for the food!",
        imageSrc: "/assets/img/faces/pig.png"
    },
    {
        text: "raccoon",
        value: "/assets/img/faces/raccoon.png",
        selected: false,
        description: "A true adventurer. You can forage for your food and climb to the highest points.",
        imageSrc: "/assets/img/faces/raccoon.png"
    },
    {
        text: "elephant",
        value: "/assets/img/faces/elephant.png",
        selected: false,
        description: "You love to travel in packs. You travel to build your global community!",
        imageSrc: "/assets/img/faces/elephant.png"
    },
    {
        text: "lion",
        value: "/assets/img/faces/lion.png",
        selected: false,
        description: "You are on the prowl for excitement, but you don't mind some downtime in the sun.",
        imageSrc: "/assets/img/faces/lion.png"
    },
    {
        text: "toucan",
        value: "/assets/img/faces/toucan.png",
        selected: false,
        description: "All things sunny! Bring you the fuity drink and let you fly around with your friends",
        imageSrc: "/assets/img/faces/toucan.png"
    }
    
];

// set parameters for ddslick
$('#avatar').ddslick({
    data: avatarOps,
    width: "80%",
    height: "350px",
    selectText: "Select your spirit animal",
    imagePosition: "left",
    background: "transparent",
    color: "black",
    onSelected: function (selectedAvatar) {
        //callback function: do something with selectedData;
        console.log(selectedAvatar);
    }
});

// find the ddslick hidden input and give it a name to access later
$('#avatar').find('input[type=hidden]:first').attr("name", "avatar");

// click handler for signup button
$("#signup-btn").on("click", function (event) {
    event.preventDefault();

    // assign user input to variables
    var newName = $("#user-name").val().trim();
    var newEmail = $("#user-email").val().trim().toLowerCase();
    var newPassword = $("#user-password").val();
    var newGender = $("#user-gender").val().trim();
    var newImage = $('[name="avatar"]')[0].value;

    // make the ajax post if the data isn't empty or the default data
    if (newName !== "" && newEmail !== "" && newPassword !== "" && newGender !== "gender" && newImage !== "") {

        // create the new user object using the user input
        var newUser = {
            username: newName,
            email: newEmail,
            password: newPassword,
            gender: newGender,
            user_image: newImage
        }

        // Send an AJAX POST-request with jQuery to create a new user
        $.post("/api/users", newUser)

            // On success, run the following code
            .then(function (dbUser) {
                // localStorage.setItem("user_id", dbUser.id);
                window.location.href = "/authSuccess";
            });
    };

});