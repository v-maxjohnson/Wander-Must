//require our models
var db = require("../models");

module.exports = function(app) {
   
    //GET route for getting all **users**
    app.get("/api/users", (req, res) => {
        db.User.findAll({
        }).then((dbUser) => {
            res.json(dbUser);
        }).catch((err) => {
            res.json(err);
        });
    });

    //POST route for saving a new **user**
    app.post("/api/users", (req, res) => {
        db.User.create({
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            gender : req.body.gender,
            user_image : req.body.user_image
        }).then((dbUser) => {
            res.json(dbUser);
        }).catch((err) => {
            res.json(err);
        });
    });

    //PUT route for updating email, password, or user_image for a **user**
    app.put("/api/users/:id", (req, res) => {
        db.User.update({
            email : req.body.email,
            password : req.body.password,
            user_image : req.body.user_image
        }, {
            where : {
                id : req.params.id
            }
        }).then((dbUser) => {
        res.json(dbUser);
        }).catch((err) => {
        res.json(err);
        });
    });

    //DELETE route for deleting a **user**
    app.delete("/api/users/:id", (req, res) => {
        db.User.destroy({
            where : {
                id : req.params.id
            }
        }).then((dbUser) => {
            res.json(dbUser);
        }).catch((err) => {
            res.json(err);
        });
    });
};