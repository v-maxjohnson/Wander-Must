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

// sets up the Express app to serve static files
app.use(express.static(path.join(__dirname, "/app/public")));

// sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport session
app.use(session({ secret: "Xander-must", resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// variable declaration for handlebars
const exphbs = require("express-handlebars");

// handlebars configuration
app.engine('handlebars', exphbs({
    extname: '.handlebars',
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'app/views/partials'),
    layoutsDir: path.join(__dirname, 'app/views/layouts'),
    helpers: {
        ifCond: function (v1, v2, options) {
            if (v1 === v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'app/views'))

// might perhaps initialize the passport session after the static path declaration
// to avoid having authentication (deserializeUser) around every request

// import routes and give the server access to them 
require("./app/routes/item-api-routes.js")(app);
require("./app/routes/suitcase-api-routes.js")(app);
require("./app/routes/user-api-routes.js")(app);
require("./app/routes/locale-api-routes.js")(app);
require("./app/routes/html-routes.js")(app, passport);

//routes for authorization
var authRoute = require("./app/routes/auth.js")(app, passport);

// loads passport strategies for authentication
require("./app/config/passport/passport.js")(passport, db.User);

let seq = db.sequelize.sync();
// syncs all defined models to the database and starts the server to begin listening
seq.then(() => {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});

module.exports = {
    app: app,
    seq: seq
};