// // type: Sequelize.STRING,
// //         allowNull: false,
// //         get: function () {
// //             return this.getDataValue('instances').split(';')
// //         },
// //         set: function (val) {
// //            this.setDataValue('instances',val.join(';'));
// //         }

// // model export for items table/model
// module.exports = function (sequelize, DataTypes) {
//     var Suitcase = sequelize.define("Suitcase", {
//       city: {
//         type: DataTypes.STRING,
//         // restrict user name from being entered if it doesn't have a text value
//         allowNull: false
//       },
//       dates: {
//         type: DataTypes.STRING,
//         // restrict email from being entered if it doesn't have a text value
//         allowNull: false,
//         // make sure email is valid email address
//         validate:{
//             isEmail : true
//         }
//       },
//       travel_category: {
//         type: DataTypes.STRING,
//         allowNull: false
//       }
//     }, {
//         // disable timestamps
//         timestamps: false
//       }
//     );
//     return Suitcase;
//   };