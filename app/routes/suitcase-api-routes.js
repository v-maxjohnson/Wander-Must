var db = require("../models");

module.exports = function(app) {

//GET route for getting all the **suitcases**
app.get("/api/suitcases", (req, res) => {
    db.Suitcase.findAll({}).then((dbSuitcase) => {
        res.json(dbSuitcase);
    }).catch((err) => {
        res.json(err);
    });
});

//POST route for saving a new **suitcase**
app.post("/api/suitcases", (req, res) => {
    db.Suitcase.create({
        city: req.body.city,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        travel_category: req.body.travel_category,
        items: req.body.items
    }).then((dbSuitcase) => {
        res.json(dbSuitcase);
    }).catch((err) => {
        res.json(err);
    });
});

//PUT
//DELETE
};