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
        text: "koala",
        value: 1,
        selected: false,
        description: "Koala - slow paced travel with lots of good eats. Just like to hang around.",
        imageSrc: "/assets/img/faces/avatar_koala.jpg"
    },
    {
        text: "panda",
        value: 2,
        selected: false,
        description: "say some stuff",
        imageSrc: "/assets/img/faces/avatar_panda.jpg"
    },
    {
        text: "penguin",
        value: 3,
        selected: false,
        description: "stuff",
        imageSrc: "/assets/img/faces/avatar_penguin.jpg"
    },
    {
        text: "cow",
        value: 4,
        selected: false,
        description: "things",
        imageSrc: "/assets/img/faces/avatar_cow.jpg"
    }
];
    

$('#avatar').ddslick({
    data: avatarOps,
    width: "80%",
    selectText: "Select your spirit animal!!!",
    imagePosition:"left",
    background: "transparent",
    onSelected: function(selectedAvatar){
        //callback function: do something with selectedData;
        console.log(selectedAvatar);
    }   
});