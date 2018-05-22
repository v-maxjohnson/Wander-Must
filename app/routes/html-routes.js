// variable declaration to hold sequelize models
let db = require("../models");

// function to render html through handlebars
module.exports = function (app) {

    // route to display index through handlebars
    app.get("/", (req, res) => {
        res.render("index");
    });

    app.get("/index", (req, res) => {
        res.render("index");
    });

    app.get("/signup", function (req, res) {
        res.render("signup", { layout: 'signup_layout.handlebars' });
    });

    // route to display basic search page through handlebars
    app.get("/search/", (req, res) => {
        res.render("search");
    });

    app.get("/suitcase-start", (req, res) => {
        res.render("suitcase-start");
    });

    // suitcase path must have a suitcase id -- otherwise, redirect to index
    app.get("/suitcase/", (req, res) => {
        res.redirect("/");
    });

    // route to display a user's specific suitcase
    app.get("/search/:locale_city", (req, res) => {
        db.Locale.findOne({
            where: {
                locale_city: req.params.locale_city
            }
        }).then(localeResult => {
            db.Suitcase.findAll({
                where: {
                    locale_id: localeResult.id
                },
                include: [

                    db.Locale
                ]
            }).then((dbSuitcases) => {
                res.render("search", { suitcases: dbSuitcases });
            }).catch((err) => {
                console.log(err);
                res.json(err);
            });
        });
    });

    //GET route for getting all **items** pertaining to a specific suitcase
    app.get("/suitcase/:id", (req, res) => {
        db.Suitcase.findOne({
            where: {
                id: req.params.id
            },
            include: [
                { model: db.User },
                { model: db.Item },
                { model: db.Locale }
            ]
        }).then((dbSuitcase) => {
            res.render("suitcase", { suitcase: dbSuitcase });
        }).catch((err) => {
            res.json(err);
        });
    });

    // route to display a user's specific suitcase
    // app.get("/suitcase/:id", (req, res) => {
    //     db.Suitcase.findOne({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(function (dbSuitcase) {
    //         let suitcaseObject = {
    //             suitcase_items: dbSuitcase
    //         };
    //         res.render("suitcase", suitcaseObject);
    //     }).catch((err) => {
    //         res.json(err);
    //     });
    // });

    // route to display a user's specific profile
    app.get("/profile/:id", (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: db.Suitcase,
                include: [db.Locale]
            }]
        }).then(function (dbUser) {
            res.render("profile", { user: dbUser });
        }).catch((err) => {
            res.json(err);
        });
    });

};