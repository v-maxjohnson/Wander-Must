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
    deleteItem: ( {suitcase_id, item_id} ) => {
        return db.Suitcase.findOne({
            where: {
                id: suitcase_id
            }
        })
        .then( suitcase => suitcase.delete( {item_id: item_id} ) )
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
                        .then( suitcase => {
                            let newObj = Object.assign(suitcase.get(), {
                                "hadPreviousSuitcases": (locale.Suitcases.length !== 0)
                            });
                            return newObj;
                        })
                        .catch( err => console.log(err.message) )
                }
            })
            .catch( err => console.log(err) )
    },
    updateItemOnSuitcase: ( {suitcase_id, item_id, item_amount} ) => {
        return db.Suitcase.findOne({
            where: {
                suitcase_id: suitcase_id
            }
        })
            .then( dbSuitcase => {
                return dbSuitcase.findOne({
                    where: {
                        item_id: item_id
                    }
                })
                    .then( dbItem => dbItem.update( {item_amount: item_amount} ) )
                    .catch( err => console.log(err.message) )
            })
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
                let newItems = [item_ids];
                let allItems = newItems.concat(existingItems).map(i => Number(i));

                return dbSuitcase.setItems(allItems);
            })
                .then( result => result )
                .catch( err => console.log(err.message) )
    }

}