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
    },
    create : ( city, admin, country ) => {
        return (
            db.Locale.findOne({
                where: city
            })
            .then( dbLocale => dbLocale
            //     {
            //     // if( dbLocale === null ) {
            //     //     db.Locale.create({
            //     //         locale_city: city,
            //     //         locale_admin: admin,
            //     //         locale_country: country
            //     //     }).then( dbLocale => dbLocale )
            //     // }
            //     // else {
            //     //     return dbLocale
            //     // }
            // }
        )
            // .then( newLocale => newLocale )
            .catch( err => err )
        )
    }
}