//require our models
var db = require("../models");

module.exports = function(app) {

    //GET route for getting all the **items**
    app.get("/api/suitcases/items", (req, res) => {
        db.Item.findAll({}).then((dbItem) => {
            res.json(dbItem);
        }).catch((err) => {
            res.json(err);
        });
    });

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