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
    findByLocale: ( {locale_city} ) => {
        return db.Locale.findOne({ 
            where: { locale_city }
        })
        .then( dbLocale => {
                return db.Suitcase.findAll({
                    where: {
                        locale_id : dbLocale.dataValues.id
                    },
                    include: [
                        { model: db.User }
                    ]
                })
                .then( dbSuitcases => {
                    return unpackSequelize( dbSuitcases )
                })
        })
    },



    // create: () => {
    //     return (

    //     )
    // },
    // updateItemOnSuitcase : ({ id, itemId, amount }) => {
    //     return (
    //         db.Suitcase.findOne({
    //             where: id
    //         })
    //         .then( dbSuitcase => {
    //             dbSuitcase.findOne({
    //                 where: itemId
    //             })
    //             .then( dbSuitcaseItem => {
    //                 dbSuitcaseItem.update({
    //                     item_amount: amount
    //                 })
    //             })
    //         })
    //     )
    // }
}