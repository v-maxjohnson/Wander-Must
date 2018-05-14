//require our models
var db = require("../models");

module.exports = function(app) {

    //GET route for getting all the **items**
    app.get("/api/items", (req, res) => {
        db.Item.findAll({
        }).then((dbItem) => {
            res.json(dbItem);
        }).catch((err) => {
            res.json(err);
        });
    });

    //POST route for saving a new **item** to item
    app.post("/api/items", (req, res) => {
        db.Item.create({
            item_name : req.body.item_name,
            item_category : req.body.category
        }).then((dbItem) => {
            res.json(dbItem);
        }).catch((err) => {
            res.json(err);
        });
    });
    //**** Still not 100% sure about this one ****//
    //POST route for saving a new **item** to a suitcase
    app.post("api/suitcases/:newItem", (req, res) => {
        db.Suitcase.createItem({
            item_name : req.body.item_name,
            item_category : req.body.item_category
        }, {
            where : {
                items : req.params.newItem
            }
        }).then((dbSuitcase) => {
            res.json(dbSuitcase);
        }).catch((err) => {
            res.json(err);
        });
    });

    //**** Still not 100% sure about this one ****//
    //PUT route for updating an **item** in a suitcase
    app.put("/api/suitcases/:itemId", (req, res) => {
        db.Suitcase.updateItem({
            item_name : req.body.item_name,
            item_category : req.body.item_category
        }, {
            where : {
                items : req.params.itemId
            }
        }).then((dbItem) => {
                res.json(dbItem);
        }).catch((err) => {
                res.json(err);
        });
    });

    //**** Still not 100% sure about this one ****//
    //DELETE route for deleting an **item** from a suitcase
    app.delete("/api/suitcases/:itemiId", (req, res) => {
        db.Suitcase.destroyItem({
            where : {
                itemId : req.params.itemId
            }
        }).then((dbItem) => {
            res.json(dbItem);
        }).catch((err) => {
            res.json(err);
        });
    });
};