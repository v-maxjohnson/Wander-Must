// model export for suitcase table/model
module.exports = function (sequelize, DataTypes) {
    var Suitcase = sequelize.define("Suitcase", {
        city: {
            type: DataTypes.STRING,
            // restrict suitcase city from being entered if it doesn't have a text value
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATEONLY,
            // restrict start date from being entered if it doesn't have a text value
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATEONLY,
            // restrict end date from being entered if it doesn't have a text value
            allowNull: false
        },
        travel_category: {
            type: DataTypes.STRING,
            // restrict travel category from being entered if it no option has been selected
            allowNull: false
        },
        items: {
            type: DataTypes.STRING,
            // suitcases should have at least 1 item in addition to preloaded items
            allowNull: false,
            get: function () {
                return this.getDataValue('items').split(';')
            },
            set: function (val) {
                this.setDataValue('items', val.join(';'));
            }
        },
        notes: {
            type: DataTypes.TEXT // this field is optional for the suitcase and can be null
        }
    }, {
            // disable timestamps
            timestamps: false
        }
    );
    return Suitcase;
};