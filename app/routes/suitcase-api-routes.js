//require our models
var db = require("../models");

module.exports = function(app) {

    //GET route for getting all the **suitcases**
    app.get("/api/suitcases", (req, res) => {
        db.Suitcase.findAll({
            include: [
                { model: db.Item }
            ]
        }).then((dbSuitcase) => {
            res.json(dbSuitcase);
        }).catch((err) => {
            res.json(err);
        });
    });

    //POST route for saving a new **suitcase**
    app.post("/api/suitcases", (req, res) => {
        db.Suitcase.create({
            city : req.body.city,
            start_date : req.body.start_date,
            end_date : req.body.end_date,
            travel_category : req.body.travel_category,
            notes : req.body.notes,
            user_id: req.body.user_id
        }).then((dbSuitcase) => {
            res.json(dbSuitcase);
        }).catch((err) => {
            res.json(err);
        });
    });

    //PUT route for updating items or notes in a **suitcase**
    app.put("api/suitcases/:suitcaseId", (req, res) => {
        db.Suitcase.update({
            start_date : req.body.start_date,
            end_date : req.body.end_date,
            notes : req.body.notes
        }, {
            where : {
                id : suitcaseId
            }
        }).then((dbSuitcase) => {
            res.json(dbSuitcase);
        }).catch((err) => {
            res.json(err);
        });
    });

    //DELETE route for deleting a **suitcase**
    app.delete("api/suitcases/:suitcaseId", (req, res) => {
        db.Suitcase.destroy({
            where : {
                id : req.params.suitcaseId
            }
        }).then((dbSuitcase) => {
            res.json(dbSuitcase);
        }).catch((err) => {
            res.json(err);
        });
    });
};