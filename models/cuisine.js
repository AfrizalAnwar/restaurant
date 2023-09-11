"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cuisine.belongsTo(models.Category, { foreignKey: "categoryId" })
      Cuisine.belongsTo(models.User, { foreignKey: "authorId" })
    }
  }
  Cuisine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "name cannot be empty"
          }
        }
      }, 
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "description cannot be empty"
          }
        }
      },
      price: {
        type:DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "price cannot be empty"
          },
          len: 5 
        }
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "imgUrl cannot be empty"
          } 
        }
      },
      authorId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        }
      },
      categoryId:{
        type:  DataTypes.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        }
      }
    },
    {
      sequelize,
      modelName: "Cuisine",
    }
  )
  return Cuisine
}
