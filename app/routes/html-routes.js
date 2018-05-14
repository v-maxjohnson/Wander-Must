// variable declaration to hold sequelize models
let db = require("../models");

// function to render html through handlebars
module.exports = function (app) {

    // route to display index through handlebars
    app.get("/", function (req, res) {
        res.render("index");
    });

    // route to display basic search page through handlebars
    app.get("/search/", function (req, res) {
        res.render("search");
    });

    // route to display a user's specific suitcase
    app.get("/search/:city", function (req, res) {
        db.Suitcase.findAll({
            where: {
                city: req.params.city
            }
        }).then(function (dbCitySearch) {
            let resultsObject = {
                suitcase_results: dbCitySearch
            };
            res.render("search", resultsObject);
        });
    });

    // route to display a user's specific suitcase
    app.get("/suitcase/:id", function (req, res) {
        db.Suitcase.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbSuitcase) {
            let suitcaseObject = {
                suitcase_items: dbSuitcase
            };
            res.render("suitcase", suitcaseObject);
        });
    });

    // route to display a user's specific profile
    app.get("/profile/:id", function (req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbUser) {
            let userObject = {
                user_suitcases: dbUser
            };
            res.render("suitcase", userObject);
        });
    });

};