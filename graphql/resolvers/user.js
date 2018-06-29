//require our models
var db = require("../../models");

let unpackSequelize = data => {
    data = data.map( node => node.get( {plain: true} ) )
    return data;
}

export default {
    findAll: () => {
        return (
            db.User.findAll({
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
            .catch( err => err )
        )
    },
    findById: (id) => {
        return (
            db.User.findOne({
                where: id,
                include: [
                    {
                        model: db.Suitcase,
                        include: [db.Locale]
                    }
                ]
            })
                .then(dbUser => dbUser)
        )
            .catch(err => err)

    }
}