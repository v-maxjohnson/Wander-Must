//require our models
var db = require("../models");

module.exports = function(app) {

    ////////----GET ROUTES----////////
    //GET route for getting all the **items**
    app.get("/api/suitcases/items", (req, res) => {
        db.Item.findAll({}).then((dbItem) => {
            res.json(dbItem);
        }).catch((err) => {
            res.json(err);
        });
    });
    //GET route for getting all the **suitcases**
    app.get("/api/suitcases", (req, res) => {
        db.Suitcase.findAll({}).then((dbSuitcase) => {
            res.json(dbSuitcase);
        }).catch((err) => {
            res.json(err);
        });
    });

    ////////----POST ROUTES----////////
    //POST route for saving a new **item**
    app.post("/api/suitcases/items", (req, res) => {
        db.Item.create({
            item_name: req.body.item_name,
            item_category: req.body.category
        }).then((dbItem) => {
            res.json(dbItem);
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

    ////////----PUT ROUTES----////////
    //PUT route for updating an **item**
    app.put("/api/suitcases/:itemid", (req, res) => {
        db.Item.update({
            item_name: req.body.item_name,
            item_category: req.body.item_category
        }, {
                where: {
                    items: req.params.itemid
                }
            }).then((dbItem) => {
                res.json(dbItem);
            }).catch((err) => {
                res.json(err);
            });
    });

    ////////----DELETE ROUTES----////////
    //DELETE route for deleting an **item**
    app.delete("/api/suitcases/:itemid",(req, res) => {
        db.Item.destroy({
            where: {
                items: req.params.itemid
            }
        }).then((dbItem) => {
            res.json(dbItem);
        }).catch((err) => {
            res.json(err);
        });
    });
};