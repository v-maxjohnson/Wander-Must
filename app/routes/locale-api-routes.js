//require our models
var db = require("../models");

module.exports = function (app) {

    //POST routes for creating a new locale in the locale table
    app.post("/api/locale", (req, res) => {
        db.Locale.findOne({
            where: {
                locale_city: req.body.locale_city
            }
        }).then(dbLocale => {
            if (dbLocale === null) {
                db.Locale.create({
                    locale_city: req.body.locale_city,
                    locale_admin: req.body.locale_admin,
                    locale_country: req.body.locale_country
                }).then(newLocale => res.json(newLocale));
            }
            else {
                return res.json(dbLocale);
            }
        }).catch(err => {
            res.json(err);
        });
    });

};