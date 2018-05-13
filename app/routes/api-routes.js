//require our Item model
var db = require("../models");

//Routes
module.exports = function(app) {
    //GET route for getting all the items
    app.get("/api/items", (req, res) => {
        db.Item.findAll({}).then((dbItem) => {
            res.json(dbItem);
        });
    });

    //POST route for saving a new item
    app.post("/api/items", (req, res) => {
        db.Item.create({
            item_name: req.body.item_name,
            item_category: req.body.category
        }).then((dbItem) => {
            res.json(dbItem);
        });
    });

    //DELETE
    //PUT
};