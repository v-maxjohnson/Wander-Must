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
        
    },
    findByLocale: (locale_city) => {
        return (
            db.Locale.findOne({
                where: locale_city
            })
                .then( localeResult => {
                    return (
                        db.Suitcase.findAll({
                            where: { locale_id: localeResult.id },
                            include : [ 
                                { model: db.Item },
                                { model: db.User },
                                { model: db.Locale }
                            ]
                        })
                            .then(dbSuitcases => dbSuitcases)
                    )
                        .catch(err => err)
                })
        )
            .catch(err => err)

    }
}