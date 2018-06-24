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
            .then( dbSuitcases => unpackSequelize(dbSuitcases) )
            .catch( err => err )
        )
    }
}