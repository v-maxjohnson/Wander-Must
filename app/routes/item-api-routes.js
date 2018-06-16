//require our models
var db = require("../models");

module.exports = function (app) {

    //POST route for saving a new **item** to item table
    app.post("/api/items", (req, res) => {
        db.Item.findOne({
            where: {
                item_name: req.body.item_name
            }
        }).then( dbItem => {
            if (dbItem === null) {
                db.Item.create({
                    item_name: req.body.item_name,
                    item_category: req.body.item_category
                }).then( item =>
                    res.status(200).json(item)
                );
            }
            else {
                return res.json({
                    message: 'Item already exists.',
                    item: dbItem
                });
            }
        }).catch( err =>
            res.json(err)
        );
    });
    
    //PUt route for updating an **item_amount** in a *user's suitcase*
    app.put("/api/:item", (req, res) => {
        dbSuitcase.Items.findOne({
            where: {
                id: req.params.id
            }
        }).then( dbItem => 
            dbItem.update({
                item_amount: req.body.amount
            }).catch( err => 
                res.json(err)
            )
        ).catch( err => 
            res.json(err)
        );
    });
};