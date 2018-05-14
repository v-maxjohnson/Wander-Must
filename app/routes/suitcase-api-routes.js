//require our models
var db = require("../models");

module.exports = function(app) {

    //GET route for getting all the **suitcases**
    app.get("/api/suitcases", (req, res) => {
        db.Suitcase.findAll({
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
            items : req.body.items,
            notes : req.params.notes
        }).then((dbSuitcase) => {
            res.json(dbSuitcase);
        }).catch((err) => {
            res.json(err);
        });
    });

    //PUT route for updating items or notes in a **suitcase**
    app.put("api/suitcases", (req, res) => {
        db.Suitcase.update({
            items : req.body.items,
            notes : req.params.notes
        }).then((dbSuitcase) => {
            res.json(dbSuitcase);
        }).catch((err) => {
            res.json(err);
        });
    });

    //**** Still not 100% sure about this one. ****//
    //DELETE route for deleting a **suitcase** from a user
    app.delete("api/suitcases/:suitcaseId", (req, res) => {
        db.User.destroySuitcase({
            where : {
                suitcaseId : req.params.suitcaseId
            }
        }).then((dbUser) => {
            res.json(dbUser);
        }).catch((err) => {
            res.json(err);
        });
    });
};