// instead of having a controller, I"m adding the logic that interacts
// with the back end right here

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// May need to modify below paths based on what pages are created

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// requiring express so I can call the render method
var express = require("express");

// passport is necessary for auth and is thus passed in this function
module.exports = function(app, passport) {
    app.get("/signup", function(req, res) {
        res.render("signup")
    });

    app.get("/index", function(req, res) {
        res.render("index")
    });

    app.get("/logout", function(req, res) {
        req.session.destroy(function(err) {
            res.redirect("/")
        })
    });

    app.get("/profile", isLoggedIn, function(req, res) {
        res.render("profile");
    });

    app.get("/auth/twitter", passport.authenticate("twitter"));

    app.get('/auth/twitter/return', 
    passport.authenticate('twitter', { failureRedirect: '/index' }),
    function(req, res) {
    // Successful authentication, redirect to customer profile.
    res.redirect('/profile');
    });

    // route for signing up aka applying
    // the strategy for our /signup route
    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/profile",
        //the only way this failureRedirect is triggered is if there is something thrown on the front end
        failureRedirect: "/signup"
    }
    ));

    app.post("/index", passport.authenticate("local-signin", {

        successRedirect: "/profile",

        failureRedirect: "/index"
    }));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect("/index")
    }
}