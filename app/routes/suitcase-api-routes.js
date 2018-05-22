//require our models
var db = require("../models");

module.exports = function (app) {

    //GET route for getting all **items** pertaining to a specific suitcase
    app.get("/api/suitcase/:suitcase_id", (req, res) => {
        db.Suitcase.findOne({
            where: {
                id: req.params.suitcase_id
            },
            include: [
                { model: db.User },
                { model: db.Item }
            ]
        }).then((dbSuitcase) => {
            res.json(dbSuitcase);
        }).catch((err) => {
            res.json(err);
        });
    });

    //POST route for creating and saving a new **suitcase**
    app.post("/api/suitcases", (req, res) => {
        db.Locale.findOne({
            where: {
                id: req.body.locale_id
            },
            include: [db.Suitcase]
        }).then(locale => {
            if (locale) {
                db.Suitcase.create({
                    start_date: req.body.start_date,
                    end_date: req.body.end_date,
                    travel_category: req.body.travel_category,
                    user_id: req.body.user_id,
                    locale_id: req.body.locale_id
                })
                    .then(suitcase => res.json(Object.assign(suitcase, {
                        "hadPreviousSuitcases": (locale.Suitcases.length !== 0)
                    })))
                    .catch(err => {
                        console.log(err);
                        res.json(err);
                    });
            }
        });
    });

    //POST route for checking if an item already exist in the user's suitcase so that no duplicates can be added
    // app.post("/api/suitcase/:suitcase_id/addItems", (req, res) => {
    //     db.Suitcase.findOne({
    //         where : {
    //             id : req.params.suitcase_id
    //         },
    //         include : [db.Item]
    //     }).then(dbSuitcase => {
    //         let itemsArr = req.body.ids.concat( dbSuitcase.Items.map(i => i.id) );

    //         dbSuitcase.setItems(itemsArr).then(result => res.json(result));       
    //     }).catch(err => {
    //         console.log(err);
    //             res.json(err);
    //     });
    // });

    app.post("/api/suitcase/:suitcase_id/addItems", (req, res) => {
        db.Suitcase.findOne({
            where: {
                id: req.params.suitcase_id
            },
            include: [db.Item]
        })
            .then(
                dbSuitcase => dbSuitcase.setItems(req.body.ids.concat(dbSuitcase.Items.map(i => i.id)))
            )
            .then(
                result => res.json(result)
            )
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    });

    //DELETE route for deleting an item in a suitcase
    app.delete("/api/suitcase/:suitcase_id/:item_id", (req, res) => {
        db.Suitcase.findOne({
            where: {
                id: req.params.suitcase_id
            },
            include: [db.Item]
        }).then(dbSuitcase => {
            dbSuitcase.removeItem(req.params.item_id)
                .then(function () {
                    return res.json(dbSuitcase);
                })
                .catch((err) => {
                    res.json(err);
                });
        }).catch(err => {
            res.json(err);
        });
    });


    //DELETE route for deleting a **suitcase**
    app.delete("/api/suitcases/:suitcase_id", (req, res) => {
        db.Suitcase.destroy({
            where: {
                id: req.params.suitcase_id
            }
        }).then((dbSuitcase) => {
            res.json(dbSuitcase);
        }).catch((err) => {
            res.json(err);
        });
    });
};