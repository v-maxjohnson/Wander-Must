var Nightmare = require("nightmare");
var nightmare = Nightmare ({ show: true});

nightmare   
    .goto("localhost:3000")
    .click("#index-signup")
    .wait()
    .type("")