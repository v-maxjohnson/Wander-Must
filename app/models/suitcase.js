// type: Sequelize.STRING,
//         allowNull: false,
//         get: function () {
//             return this.getDataValue('instances').split(';')
//         },
//         set: function (val) {
//            this.setDataValue('instances',val.join(';'));
//         }