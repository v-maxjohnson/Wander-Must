//require our models
var db = require("../../models");

let unpackSequelize = data => {
    data = data.map( node => node.get( {plain: true} ) )
    return data;
}

export default {
    findAll: () => {
        return (
            db.Suitcase.findAll({
                include: [
                    { model: db.User },
                    { model: db.Item }
                ]
            })
            .then( dbSuitcases => unpackSequelize( dbSuitcases ) )
            .catch( err => err )
        )
    },
    findById: ( id ) => {
        return (
            db.Suitcase.findOne({
                where: id, 
                include : [ 
                    { model: db.Item },
                    { model: db.User },
                    { model: db.Locale }
                ]
            })
            .then( dbSuitcase =>  dbSuitcase ) 
            )
            .catch( err => err )
        
    }
}

//GET route for getting all **suitcases** pertaining to a specific *location*
// app.get("/api/suitcase/:locale", (req, res) => {
//     db.Suitcase.findAll({
//         where : {
//             locale_id: req.params.locale_id
//         },
//         include: [
//             { model: db.User },
//             { model: db.Item }
//         ]
//     }).then( dbSuitcases =>
//         res.json(dbSuitcases)
//     ).catch( err => 
//         res.json(err)
//     );
// });