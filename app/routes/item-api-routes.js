//require our models
var db = require("../models");

module.exports = function(app) {

    //GET route for getting all the **items** then checking if they already exist before creating new ones
    app.get("/api/items", (req, res) => {
        db.Item.findAll({
            where : {
                item_name : req.body.item_name
            }
        }).then((repeatdbItem) => {
            db.Item.create({
                item_name : req.body.item_name,
                item_category : req.body.item_category,
                instances : req.body.instances
            }, {
                where : {
                    $notLike: repeatdbItem
                }
        }).then((dbItem) => {
        res.json(dbItem);
        }).catch((err) => {
        res.json(err);
        });
    });

    //GET route for getting all **items** pertaining to a specific suitcase
    app.get("api/suitcases/:suitcase_id", (req, res) => {
        db.Suitcase.findAll({ 
            include: [ 
                {
                    model : db.Item, 
                    where : {
                        item_name : req.body.item_name,
                        item_category : req.body.item_category
                    }
                }
            ]
        }, {
            where : {
                id : req.params.suitcase_id
            }
        }).then((dbSuitcase) => {
            res.json(dbSuitcase);
        }).catch((err) => {
            res.json(err);
        });
    });

    //POST route for saving a new **item** to item table
    app.post("/api/items", (req, res) => {
        db.Item.create({
            item_name : req.body.item_name,
            item_category : req.body.item_category,
            instances : req.body.instances
        }).then((dbItem) => {
            res.json(dbItem);
        }).catch((err) => {
            res.json(err);
        });
    });

};