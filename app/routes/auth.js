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

    app.get("/logout", function(req, res) {
        req.session.destroy(function(err) {
            res.redirect("/")
        })
    });

    app.get("/profile", isLoggedIn, function(req, res) {
        res.render("profile");
    })

    // route for signing up aka applying
    // the strategy for our /signup route
    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/profile",

        failureRedirect: "/signup"
    }
    ));

    app.post("/signin", passport.authenticate("local-signin", {
        successRedirect: "/profile",

        failureRedirect: "/login"
    }))

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect("/login")
    }
}