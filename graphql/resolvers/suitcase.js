//require our models
var db = require("../../models");

let unpackSequelize = data => {
    data = data.map(node => node.get( { plain: true} ) )
    return data;
}

export default {
    findAll: () => {
        return db.Suitcase.findAll({
            include: [
                { model: db.User },
                { model: db.Item }
            ]
        })
            .then( dbSuitcases => unpackSequelize(dbSuitcases) )
            .catch( err => err )
    },
    findById: ( id ) => {
        return db.Suitcase.findOne({
            where: id,
            include: [
                { model: db.Item },
                { model: db.User },
                { model: db.Locale }
            ]
        })
            .then( dbSuitcase => dbSuitcase )
            .catch( err => err )
    },
    findByLocale: ( locale_city ) => {
        return db.Locale.findOne({ 
            where: locale_city
        })
            .then( dbLocale => {
                return db.Suitcase.findAll({
                    where: {
                        locale_id : dbLocale.id
                    },
                    include: [
                        { model: db.Item },
                        { model: db.User },
                        { model: db.Locale }
                    ]
                })
                    .then( dbSuitcases => {
                        return unpackSequelize( dbSuitcases )
                    })
                    .catch( err => console.log(err) )
            })
            .catch( err => console.log(err) )
    },
    create: ( {start_date, end_date, travel_category, user_id, locale_id} ) => {
        return db.Locale.findOne({
            where: {
                id: locale_id
            },
            include: [db.Suitcase]
        })
            .then( locale => {
                if ( locale ) {
                    return db.Suitcase.create({
                        start_date: start_date,
                        end_date: end_date,
                        travel_category: travel_category,
                        user_id: user_id,
                        locale_id: locale_id
                    })
                        .then( suitcase => suitcase )
                        .catch( err => console.log(err.message) )
                }
            })
            .catch( err => console.log(err.message) )
    },
    delete: ( id ) => {
        return db.Suitcase.destroy({
            where: id
        })
            .then( console.log("suitcase deleted") )
            .catch( err => console.log(err) )
    },
    addItem: ( {id, item_ids} ) => {
        return db.Suitcase.findOne({
            where: {
                id: id
            },
            include: [db.Item]
        })
            .then( dbSuitcase => {
                let existingItems = dbSuitcase.Items.map(i => i.id);
                let newItems = item_ids;
                let allItems = newItems.concat(existingItems).map(i => Number(i));

                dbSuitcase.setItems(allItems);

                return dbSuitcase
            })
            .catch( err => console.log(err.message) )
    },
    updateItem: ( {suitcase_id, item_id, item_amount} ) => {
        return db.Suitcase.findOne({
            where: {
                id: suitcase_id
            },
            include: [{ 
                model: db.Item,
                    include: [ db.ItemAmount ] 
                }]
        })
            .then( dbSuitcase => {
                return dbSuitcase.update( {item_amount: item_amount} ,
                    {
                        where: {
                            item_id: item_id
                        }
                    })
            })
            .catch( err => console.log(err) )
    },
    updateNote: ( {id, note} ) => {
        return db.Suitcase.findOne({
            where: {
                id: id
            }
        })
            .then( suitcase => suitcase.update( {notes: note} ) )
            .catch( err => console.log(err) )
    },
    deleteItem: ( {suitcase_id, item_id} ) => {
        return db.Suitcase.findOne({
            where: {
                id: suitcase_id
            },
            include: [ db.Item ]
        })
            .then( suitcase => suitcase.removeItem( item_id ) )
            .catch( err => console.log(err.message) ) // this mutation is working, it just doesn't return anything at the moment
    },
    

}