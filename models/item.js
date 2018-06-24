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
      type: DataTypes.ENUM,
      values: ['toiletries', 'clothing', 'electronics', 'accessories'],
      // restrict category from being selected if it doesn't have a text value
      allowNull: false,
      // set default value for category to "other"
      // defaultValue: "other"
    }
  }, {
      // disable timestamps
      timestamps: false,
      // by setting paranoid to true, a deleted record will not be returned in future queries
      paranoid: true,
      underscored: true
    }
  );

  Item.associate = function (models) {
    Item.belongsToMany(models.Suitcase, {
      through: "suitcase_items",
      timestamps: false
    });
  };

  return Item;
};