//require our models
var db = require("../../models");

export default {
    findAll: () => {
        return [
            db.Suitcase.findOne({
                where: {
                    id: req.params.suitcase_id
                },
                include: [
                    { model: db.User },
                    { model: db.Item }
                ]
            }).then(dbSuitcase =>
                res.json(dbSuitcase)
            ).catch(err =>
                res.json(err)
            )
        ]
    }
}