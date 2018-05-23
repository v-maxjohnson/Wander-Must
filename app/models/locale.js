// model export for locale table/model
module.exports = function (sequelize, DataTypes) {
  var Locale = sequelize.define("Locale", {
    locale_city: {
      type: DataTypes.STRING,
      // restrict locale name from being entered if it doesn't have a text value
      allowNull: false
    },
    locale_admin: {
      type: DataTypes.STRING,
      // restrict locale name from being entered if it doesn't have a text value
      allowNull: false
    },
    locale_country: {
      type: DataTypes.STRING,
      // restrict locale name from being entered if it doesn't have a text value
      allowNull: false
    }
  }, {
      // disable timestamps
      timestamps: false,
      // by setting paranoid to true, a deleted record will not be returned in future queries
      paranoid: true,
      underscored: true
    }
  );

  Locale.associate = function (models) {
    Locale.hasMany(models.Suitcase, {
      onDelete: "cascade"
    });
  };

  return Locale;
};