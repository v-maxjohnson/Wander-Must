//require our models
var db = require("../models");

module.exports = function(app) {

    //GET route for getting all the **suitcases** with the same locale_city
    app.get("/api/locale/:locale_city", (req, res) => {
        db.Locale.findOne({
            where : {
                locale_city : req.params.locale_city
            }
        }).then(localeResult => {
            db.Suitcase.findAll({
                where : {
                    locale_id : localeResult.id
                }
            }).then((dbSuitcases) => {
                return res.json(dbSuitcases);
            });
        });
    });

    //POST routes for creating a new locale in the locale table
    app.post("/api/locale", (req, res) => {
        db.Locale.create({
            locale_city : req.body.locale_city,
            locale_admin : req.body.locale_admin,
            locale_country : req.body.locale_country
        }).then((dbLocale) => {
            return res.json(dbLocale);
        }).catch((err) => {
            res.json(err);
        });
    });

};