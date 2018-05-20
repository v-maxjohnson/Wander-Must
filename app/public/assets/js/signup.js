// const ddslick = require("ddslick");

// $(function(){
//   let avatarOptions = [
//       { id: 0, text: "Koala", "img" : "koala.jpg" }
//   ]

//   $(".image-selector").select2({
//       templateResult : state => {
//         if( ! state.id ) return state.text;

//         let basePath = "/path/to/images/";

//         let html = $(`<span><img src="${basePath}${state.img}" /><span>${state.text}</span></span>`)

//         return html;
//       }
//   })

var avatarOps = [
    {
        text: "pig",
        value: "/assets/img/faces/pig.png",
        selected: false,
        description: "Koala - slow paced travel with lots of good eats. Just like to hang around.",
        imageSrc: "/assets/img/faces/pig.png"
    },
    {
        text: "raccoon",
        value: "/assets/img/faces/raccoon.png",
        selected: false,
        description: "say some stuff",
        imageSrc: "/assets/img/faces/raccoon.png"
    },
    {
        text: "lion",
        value: "/assets/img/faces/lion.png",
        selected: false,
        description: "stuff",
        imageSrc: "/assets/img/faces/lion.png"
    },
    {
        text: "toucan",
        value: "/assets/img/faces/toucan.png",
        selected: false,
        description: "things",
        imageSrc: "/assets/img/faces/toucan.png"
    }
];
    

$('#avatar').ddslick({
    data: avatarOps,
    width: "80%",
    selectText: "Select your spirit animal",
    imagePosition:"left",
    background: "transparent",
    onSelected: function(selectedAvatar){
        //callback function: do something with selectedData;
        console.log(selectedAvatar);
    }   
});

$('#avatar').find('input[type=hidden]:first').attr("name", "avatar");

$("#signup-btn").on("click", function (event) {
    event.preventDefault();
    
    var newUser = {
        username: $("#user-name").val().trim().toLowerCase(),
        email: $("#user-email").val().trim().toLowerCase(),
        password: $("#user-password").val(),
        gender: $("#user-gender").val().trim(),
        user_image: $('[name="avatar"]')[0].value
    }

    console.log(newUser);

    // Send an AJAX POST-request with jQuery
    $.post("/api/users", newUser)
    
        // On success, run the following code
        .then(function () {
            
        });

    
});