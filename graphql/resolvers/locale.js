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
    create : ( {locale_city, locale_admin, locale_country} ) => {
        return (
            db.Locale.findOne({
                where: { 
                    locale_city: locale_city 
                }
            })
            .then( dbLocale => {
                if( dbLocale === null ) {
                    return db.Locale.create({
                        locale_city: locale_city,
                        locale_admin: locale_admin,
                        locale_country: locale_country
                    })
                    .then( createdDBLocale => createdDBLocale )
                    .catch( err => console.log(err.message) )
                }
                else {
                    return dbLocale
                }
            })
            .catch( err => console.log(err) )
        )
    }
}