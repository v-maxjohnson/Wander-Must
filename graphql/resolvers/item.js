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
    create : ( name ) => {
        return (
            db.Item.findOne({
                where: name
            })
            .then( dbItem => {
                if (dbItem === null ) {
                    db.Item.create({
                        item_name: req.body.item_name,
                        item_category: req.body.item_category
                    })
                    .then( item => item )
                }
                else {
                    console.log("item already exists")
                }
            })
            .catch( err => err )
        )
    }
}