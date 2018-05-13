// model export for user table/model
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        // restrict user name from being entered if it doesn't have a text value
        allowNull: false,
        // make sure the user name is between 3 and 15 characters
        validate: {
          len: [3, 15]
        }
      },
      email: {
        type: DataTypes.STRING,
        // restrict email from being entered if it doesn't have a text value
        allowNull: false,
        // make sure email is valid email address
        validate: {
            isEmail : true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "no choice"
      },
      user_image: {
        type: DataTypes.STRING,
        // restrict email from being entered if it doesn't have a text value
        allowNull: false,
        validate: {
            isUrl : true
        }
      }
    }, {
        // disable timestamps
        timestamps: false
      }
    );
    return User;
  };