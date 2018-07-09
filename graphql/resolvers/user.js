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
    changeName: ( {id, username} ) => {
        return db.User.findOne({
            where: {
                id: id
            }
        })
            .then( dbUser => dbUser.update( {username: username} ) )
    },
    changeEmail: ( {id, email} ) => {
        return db.User.findOne({
            where: {
                id: id
            }
        })
            .then( dbUser => dbUser.update( {email: email} ) )
    },
    changePassword: ( {id, password} ) => {
        return db.User.findOne({
            where: { 
                  id: id 
                }
        })
            .then( dbUser => dbUser.update( {password: password} ) )
    },
    changeGender: ( {id, gender} ) => {
        return db.User.findOne({
            where: {
                id: id
            }
        })
            .then( dbUser => dbUser.update( {gender: gender} ) )
    },
    // changeImage: ( {id, user_image} ) => {
    //     return db.User.findOne({
    //         where: {
            //     id: id
            // }
    //     })
    //         .then( dbUser => dbUser.update( {user_image: user_image} ) )
    // },
    delete: ( id ) => {
        return db.User.destroy({
            where: id
        })
            .then( console.log("user was deleted") )
            .catch( err => console.log(err.message) )
    }
}