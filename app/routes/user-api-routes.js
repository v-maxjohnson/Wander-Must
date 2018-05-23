//require our models
var db = require("../models");

module.exports = function (app) {

    //----- NOT SURE WE WILL USE THIS ONE -----//
    //GET route for getting all **users**
    app.get("/api/users", (req, res) => {
        db.User.findAll({
            include: [
                {
                    model: db.Suitcase, include: [
                        { model: db.Locale },
                        { model: db.Item }
                    ]
                }
            ]
        }).then((dbUser) => {
            res.json(dbUser);
        }).catch((err) => {
            res.json(err);
        });
    });

    //----- NOT SURE THAT WE WILL USE THIS ONE -----//
    // //PUT route for updating email, password, or user_image for a **user**
    // app.put("/api/users/:id", (req, res) => {
    //     db.User.update({
    //         email : req.body.email,
    //         password : req.body.password,
    //         user_image : req.body.user_image
    //     }, {
    //         where : {
    //             id : req.params.id
    //         }
    //     }).then((dbUser) => {
    //     res.json(dbUser);
    //     }).catch((err) => {
    //     res.json(err);
    //     });
    // });

    //DELETE route for deleting a **user**
    app.delete("/api/users/:id", (req, res) => {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then((dbUser) => {
            res.json(dbUser);
        }).catch((err) => {
            res.json(err);
        });
    });
};