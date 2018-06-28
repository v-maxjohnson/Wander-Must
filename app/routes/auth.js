var express = require("express");

// passport is necessary for auth and is thus passed in this function
module.exports = function (app, passport) {

    app.get("/", function (req, res) {
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

    app.get("/authSuccess", function (req, res) {
        res.redirect("/profile/" + req.user.id);
    });

    app.post(
        "/api/users/",
        passport.authenticate("local-signup", { failureRedirect: "/", successRedirect: "/authSuccess" }),
        function (req, res) {
        }
    );

    app.post("/api/signin", function (req, res, next) {
        passport.authenticate("local-signin", function (err, user, info) {
            if (err) {
                return next(err);
            }
            req.login(user, function (err) {
                if (err) { return res.redirect("/"); }
                return res.redirect("/profile/" + user.id);
            });
        })(req, res, next);
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect("/");
    }
};