const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const graphQLHTTP = require('express-graphql');
require('babel-register');
const PORT = process.env.PORT || 3001;
const app = express();
let gqlSchema = require('./graphql/schema');

app.use('/graphql', new graphQLHTTP({
 schema: gqlSchema.default,
 graphiql: true,
 pretty: true
}))

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// variable for sequelize models
let db = require("./models");

//Passport session
app.use(session({ secret: "Xander-must", resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require("./routes/yelpRoute.js")(app);

//routes for authorization
require("./routes/auth.js")(app, passport);

// loads passport strategies for authentication
require("./config/passport/passport.js")(passport, db.User);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

let seq = db.sequelize.sync();

seq.then(() => {
  app.listen(PORT, () => {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
  });

});

module.exports = {
  app: app,
  seq: seq
};