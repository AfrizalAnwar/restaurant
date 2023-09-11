"use strict"
const { Model } = require("sequelize")
const { hashPassword } = require("../utility/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cuisine, {
        foreignKey: "authorId",
      })
    }
  }
  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "username cannot be empty",
          },
          notEmpty: {
            msg: "username cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "sorry... email already register",
        },
        validate: {
          notNull: {
            msg: "email cannot be empty",
          },

          notEmpty: {
            msg: "email cannot be empty"
          },
          isEmail: true
        },  
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args : [5],
            msg : "minimum password 5"
          },
          notNull: {
            msg: "password cannot be empty",
          },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  )
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password)
  })
  return User
}
