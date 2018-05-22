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
      console.log(localStorage.getItem('myFirstKey'));

    app.get("/index", function (req, res) {
        res.render("index")
    });

    app.get("/logout", function (req, res) {
        req.session.destroy(function (err) {
            res.redirect("/")
        })
    });

    app.get("/profile", isLoggedIn, function (req, res) {
        res.render("profile");
    });

    app.get("/auth/google", passport.authenticate("google"));

    app.get('/auth/google/redirect',
    passport.authenticate('google', {
        failureRedirect: '/index'
    }),
    function (req, res) {
        // Successful authentication, redirect to customer profile.
        res.redirect('/profile');
    });

    app.get("/login/twitter", passport.authenticate("twitter"));

    app.get('/login/twitter/return',
        passport.authenticate('twitter', {

            failureRedirect: '/index'
        }),
        function (req, res) {
            // Successful authentication, redirect to customer profile.
            res.redirect('/profile');
        });

    // route for signing up aka applying
    // the strategy for our /signup route
    // app.post("/api/users", passport.authenticate("local-signup", {
    //     successRedirect: "/profile",
        //the only way this failureRedirect is triggered is if there is something thrown on the front end
        // failureRedirect: "/signup"
    // }));

    // app.post("/api/users", function (req, res, next) {
    //     passport.authenticate("local-signup", {
    //         failureRedirect: "/",
    //         successRedirect: '/profile'
    //     },
    //      function (err, user, info) {
    //         if (err) {
    //             return next(err);
    //         }

    //         req.login(user, function(err) {
    //             console.log(user);
    //             // if (err) { return next (err); }
    //             // return user;
    //             return res.redirect("/profile/" + user.id);
    //         })
    //      })(req, res, next);
    // });

    app.get("/authSuccess", function(req, res){
        console.log("/authSuccess route")
        res.redirect("/profile/" + req.user.id)
    })

    app.post(
        "/api/users/", 
        passport.authenticate("local-signup", { failureRedirect: "/", successRedirect: "/authSuccess" }), 
        function(req, res){
            console.log("/api/users" + req.body)
        }
    )


    app.get("/loggedIn", function(req, res){
        // res.json(req.user)
        // res.redirect("/profile/" + req.user.id)
        // localStorage.setItem("globalId", req.user.id)
    })

    // app.post(
    //     "/api/signin/", 
    //     passport.authenticate("local-signin", { failureRedirect: "/", successRedirect: "/loggedIn" }), 
    //     function(req, res){
    //     }
    // )

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
        res.redirect("/index")
    }
}