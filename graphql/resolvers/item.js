//require our models
var db = require("../../models");

let unpackSequelize = data => {
    data = data.map( node => node.get({plain: true}) )
    return data;
}

export default {
    findAll : () => {
        return (
            db.Item.findAll({})
            .then( dbItems => unpackSequelize(dbItems) )
            .catch( err => {
                err
            })
        )
    }
}