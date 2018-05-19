//require our models
var db = require("../models");

module.exports = function(app) {

    //GET route for getting all **items** pertaining to a specific suitcase
    app.get("/api/suitcase/:suitcase_id", (req, res) => {
        db.Suitcase.findOne({
            where : {
                id : req.params.suitcase_id
            },
            include: [ 
                 db.Item
            ]
        }).then((dbSuitcase) => {
            res.json(dbSuitcase);
        }).catch((err) => {
            res.json(err);
        });
    });

    //GET route for getting all the **suitcases** with the same city
    app.get("/api/suitcases/:city", (req, res) => {
        db.Suitcase.findAll({
            where : {
                city : req.params.city
            },
            include: [
                db.Item
            ]
        }).then((dbSuitcase) => {
            res.json(dbSuitcase);
        }).catch((err) => {
            res.json(err);
        });
    });

    //POST route for creating and saving a new **suitcase**
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

    //POST route for getting the **item** then checking if it already exist in thier suitcase before adding new items
    app.post("/api/items/:suitcase_id/:item_id", (req, res) => {
        db.Suitcase.findOne({
            where : {
                id : req.params.suitcase_id
            }
        })
        .then(results => {
            if( results ){
                db.Suitcase.hasItem(results).then(bool => {
                    if( ! bool )
                        db.Suitcase.addItem(results);
                    else
                        res.send("Error message");
                });   
            }
        });
    });

    // db.Item.findOne({
    //     where: {
    //         id: 3
    //     }
    // }).then(item => {
    //     dbSuitcase.addItem(item).then(response => {
    //         res.json(response);
    //     });
    // })

    //DELETE route for deleting a **suitcase**
    app.delete("/api/suitcases/:suitcase_id", (req, res) => {
        db.Suitcase.destroy({
            where : {
                id : req.params.suitcase_id
            }
        }).then((dbSuitcase) => {
            res.json(dbSuitcase);
        }).catch((err) => {
            res.json(err);
        });
    });
};