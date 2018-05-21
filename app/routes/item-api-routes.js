//require our models
var db = require("../models");

module.exports = function(app) {

    //POST route for saving a new **item** to item table
    app.post("/api/items", (req, res) => {
        db.Item.findOne({
            where : {
                item_name : req.body.item_name
            }
        }).then(dbItem => {
            if (dbItem === null) {
                db.Item.create({
                    item_name : req.body.item_name,
                    item_category : req.body.item_category
                });
            }
            else {
                return res.json(dbItem);
            }
        }).catch((err) => {
            res.json(err);
        });
    });

};