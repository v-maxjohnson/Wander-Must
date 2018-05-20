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

$("#signup-btn").on("submit", function (event) {
    event.preventDefault();

    var userName = $("#user-name").val().trim().toLowerCase();
    var userEmail = $("#user-email").val().trim().toLowerCase();
    var userPassword = $("#user-password").val();
    var userGender = $("#user-gender").val().trim().toLowerCase();
    var startDateObj = new Date(startDate);
    var endDateObj = new Date(endDate);
    var momentObjOne = moment(startDateObj);
    var momentObjTwo = moment(endDateObj);
    startDate = momentObjOne.format('YYYY-MM-DD');
    endDate = momentObjTwo.format('YYYY-MM-DD');

    var location = $("#suitcase-city").val().trim().toLowerCase();
    var locationArray = [];
    locationArray = location.split(", ");
    var newLocale = {
        locale_city: locationArray[0],
        locale_admin: locationArray[1],
        locale_country: locationArray[2]      
    }

    var newSuitcase = {
        start_date: startDate,
        end_date: endDate,
        travel_category: $("#travelselect").val().trim()
    };

    console.log(newLocale, newSuitcase);

    // Send an AJAX POST-request with jQuery
    $.post("/api/suitcases", newLocale, newSuitcase)
        // On success, run the following code
        .then(function () {
            // window.location.href = "/search/:locale";
        });

    
});