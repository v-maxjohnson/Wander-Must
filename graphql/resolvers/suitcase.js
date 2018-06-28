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
            where: { 
                locale_city : locale_city 
            }
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
    // deleteItem: ( {suitcase_id, item_id} ) => {
    //     return 
    // }

    
    // create : ( {} ) => {
    //     return db.Locale.findOne({
    //         where: {
    //             id: req.body.locale_id
    //         },
    //         include: [db.Suitcase]
    //     })
    //     .then( locale => {
    //         if (locale) {
    //             return db.Suitcase.create({
    //                 start_date: req.body.start_date,
    //                 end_date: req.body.end_date,
    //                 travel_category: req.body.travel_category,
    //                 user_id: req.body.user_id,
    //                 locale_id: req.body.locale_id
    //             })
    //             .then( suitcase => {
    //                 let newObj = Object.assign(suitcase.get(), {
    //                     "hadPreviousSuitcases": (locale.Suitcases.length !== 0)
    //                 });
    //                 res.json(newObj);
    //             })
    //             .catch( err => console.log(err.message)
    //     });
    // }


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