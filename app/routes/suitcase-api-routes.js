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
            {model : db.User},
            {model : db.Item }
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
            start_date : req.body.start_date,
            end_date : req.body.end_date,
            travel_category : req.body.travel_category,
            user_id: req.body.user_id,
            locale_id: req.body.locale_id
        }).then((dbSuitcase) => {
            return res.json(dbSuitcase);
        }).catch((err) => {
            console.log(err);
            res.json(err);
        });
    });

    //POST route for checking if an item already exist in the user's suitcase so that no duplicates can be added
    app.post("/api/suitcase/:suitcase_id/addItems", (req, res) => {
        db.Suitcase.findOne({
            where : {
                id : req.params.suitcase_id
            },
            include : [db.Item]
        }).then(dbSuitcase => {
            dbSuitcase.Items.forEach((i) => {
                if (req.body.ids.indexOf(i.id) === -1) {
                    req.body.ids.push(i.id);
                }
                dbSuitcase.setItems(req.body.ids);
            });
                  
        }).catch(err => {
                res.json(err);
        });
    });

    //DELETE route for deleting an item in a suitcase
    app.delete("/api/suitcase/:suitcase_id/:item_id", (req, res) => {
        db.Suitcase.findOne({
            where : {
                id : req.params.suitcase_id
            }, 
            include : [db.Item]
        }).then(dbSuitcase => {
            dbSuitcase.removeItem(req.params.item_id)
            .then(function(){
                return res.json(dbSuitcase);
            })
            .catch((err) => {
                res.json(err);
            })
        }).catch(err => {
                res.json(err);
        });
    });

    
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