//require our models
var db = require("../../models");

let unpackSequelize = data => {
    data = data.map( node => node.get( {plain: true} ) )
    return data;
}

export default {
    findAll : () => {
        return (
            db.Item.findAll({})
            .then( dbItems => unpackSequelize(dbItems) )
            .catch( err => err )
        )
    },
    create : ( {item_name, item_category} ) => {
        return db.Item.findOne({
                where: {
                    item_name : item_name
                }
            })
            .then( dbItem => {
                if ( dbItem === null ) {
                    return db.Item.create({
                        item_name: item_name,
                        item_category: item_category
                    })
                    .then( createdDBItem => createdDBItem )
                    .catch( err => console.log(err.message) )
                }
                else {
                    return dbItem
                }
            })
            .catch( err => console.log(err) )
    }
}