//require our models
var db = require("../../models");

let unpackSequelize = data => {
    data = data.map( node => node.get( {plain: true} ) )
    return data;
}

export default {
    findAll: () => {
        return db.User.findAll({
            include: [
                {
                    model: db.Suitcase, include: [
                        { model: db.Locale },
                        { model: db.Item }
                    ]
                }
            ]
        })
            .then( dbUsers => unpackSequelize(dbUsers) )
            .catch( err => console.log(err.message) )
    },
    findById: ( id ) => {
        return db.User.findOne({
            where: id,
            include: [
                {
                    model: db.Suitcase,
                    include: [db.Locale]
                }
            ]
        })
            .then( dbUser => dbUser )
            .catch( err => console.log(err.message) )

    },
    // changeInfo: ( {id, username, email, password, gender, user_image} ) => {
    //     return db.User.findOne({
    //         where: id
    //     })
    //         .then( user => {

    //         })
    // },
    delete: ( id ) => {
        return db.User.destroy({
            where: id
        })
            .then(user => console.log("user was deleted") )
            .catch( err => console.log(err.message) )
    }
}