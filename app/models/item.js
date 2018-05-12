// model export for items table/model
module.exports = function (sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
      item_name: {
        type: DataTypes.STRING,
        // restrict item name from being entered if it doesn't have a text value
        allowNull: false,
        // make sure the item name is between 3 and 35 characters
        validate: {
          len: [3, 35]
        }
      },
      item_category: {
        type: DataTypes.STRING,
        // restrict category from being selected if it doesn't have a text value
        allowNull: false,
        // set default value for category to "other"
        defaultValue: "other"
      },
      instances: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    }, {
        // disable timestamps
        timestamps: false
      }
    );
    return Item;
  };