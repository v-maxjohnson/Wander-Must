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
            .catch( err => err )
        )
    },
    findByLocale: ( id ) => {
        return (
            db.Suitcase.findAll({
                where: id,
                include : [
                    { model: db.Item },
                    { model: db.User }
                ]
            })
            .then( dbSuitcases => unpackSequelize(dbSuitcases) )
            .catch( err => err )
        )
    }
}