// variable declarations for required packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var passport = require("passport");
var session = require("express-session");

// sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// variable for sequelize models
let db = require("./app/models");

// sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport session
app.use(session({ secret: "Xander-must",resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// variable declaration for handlebars
const exphbs = require("express-handlebars");

// handlebars configuration
app.set("views", path.join(__dirname, "./app/views"));
app.engine("handlebars", exphbs({ extname: "handlebars"}));
app.set("view engine", "handlebars");

// sets up the Express app to serve static files
app.use(express.static(path.join(__dirname, "/app/public")));

// import routes and give the server access to them 
require("./app/routes/item-api-routes.js")(app);
require("./app/routes/suitcase-api-routes.js")(app);
require("./app/routes/user-api-routes.js")(app);
require("./app/routes/html-routes.js")(app);

//routes for authorization
var authRoute = require("./app/routes/auth.js")(app, passport);

// loads passport strategies for authentication
require("./app/config/passport/passport.js")(passport, db.User);

// syncs all defined models to the database and starts the server to begin listening
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});