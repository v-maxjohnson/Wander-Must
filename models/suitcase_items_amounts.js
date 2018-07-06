// model export for itemamount table/model
module.exports = function (sequelize, DataTypes) {
  var suitcase_items = sequelize.define("suitcase_items", {
    item_amount: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    } 
  }, {
      // disable timestamps
      timestamps: false,
      // by setting paranoid to true, a deleted record will not be returned in future queries
      paranoid: true,
      underscored: true
    }
  );
  suitcase_items.removeAttribute('id');

  return suitcase_items;
};