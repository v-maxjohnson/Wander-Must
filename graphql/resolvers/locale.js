//require our models
var db = require("../../models");

let unpackSequelize = data => {
    data = data.map( node => node.get( {plain: true} ) )
    return data;
}

export default {
    findAll : () => {
        return (
            db.Locale.findAll({})
            .then( dbLocales => unpackSequelize(dbLocales) )
            .catch( err => err )
        )
    }
    
}