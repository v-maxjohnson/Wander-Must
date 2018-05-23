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
module.exports = function (app, passport) {

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
       
      localStorage.setItem('myFirstKey', 'myFirstValue');

    app.get("/index", function (req, res) {
        res.render("index");
    });

    app.get("/logout", function (req, res) {
        req.session.destroy(function (err) {
            res.redirect("/");
        });
    });

    app.get("/profile", isLoggedIn, function (req, res) {
        res.render("profile");
    });

    app.get("/authSuccess", function(req, res){
        console.log("/authSuccess route");
        res.redirect("/profile/" + req.user.id);
    });

    app.post(
        "/api/users/", 
        passport.authenticate("local-signup", { failureRedirect: "/", successRedirect: "/authSuccess" }), 
        function(req, res){
            console.log("/api/users" + req.body);
        }
    );

    app.post("/api/signin", function (req, res, next) {
        passport.authenticate("local-signin", function (err, user, info) {
            if (err) {
                return next(err);
            }
            req.login(user, function(err) {
                if (err) { return next (err); }
                return res.redirect("/profile/" + user.id);
            });
        })(req, res, next);
        console.log("from the /api/signin route: " + req.user);
        
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect("/index");
    }
};