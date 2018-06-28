//POST route for checking if an **item** already exist in the user's *suitcase* so that no duplicates can be added
// app.post("/api/suitcase/:suitcase_id/addItems", (req, res) => {
//     db.Suitcase.findOne({
//         where: {
//             id: req.params.suitcase_id
//         },
//         include: [db.Item]
//     })
//         .then( dbSuitcase => {
//             let existingItems = dbSuitcase.Items.map(i => i.id);
//             let newItems = req.body.ids;
//             let allItems = newItems.concat(existingItems).map(i => Number(i));

//             return dbSuitcase.setItems(allItems);
//         })
//         .then( result => 
//             res.json(result)
//         )
//         .catch( err => {
//             res.json(err);
//         });
// });

//DELETE route for deleting an **item** in a *suitcase*
// app.delete("/api/suitcase/:suitcase_id/:item_id", (req, res) => {
//     db.Suitcase.findOne({
//         where: {
//             id: req.params.suitcase_id
//         },
//         include: [db.Item]
//     }).then( dbSuitcase => {
//         dbSuitcase.removeItem(req.params.item_id)
//             .then(function () {
//                 return res.json(dbSuitcase);
//             })
//             .catch( err =>
//                 res.json(err)
//             );
//     }).catch( err =>
//         res.json(err)
//     );
// });

//PUt route for updating an **item_amount** in a *user's suitcase*
// app.put("/api/:item", (req, res) => {
//     dbSuitcase.Items.findOne({
//         where: {
//             id: req.params.id
//         }
//     }).then( dbItem => 
//         dbItem.update({
//             item_amount: req.body.amount
//         }).catch( err => 
//             res.json(err)
//         )
//     ).catch( err => 
//         res.json(err)
//     );
// });

//DELETE route for deleting a **suitcase**
// app.delete("/api/suitcases/:suitcase_id", (req, res) => {
//     db.Suitcase.destroy({
//         where: {
//             id: req.params.suitcase_id
//         }
//     }).then( dbSuitcase =>
//         res.json(dbSuitcase)
//     ).catch( err =>
//         res.json(err)
//     );
// });
