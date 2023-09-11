const { Category, Cuisine, User } = require("../models")
class Controller {
  static async createCuisine(req, res, next) {
    try {
      const { name, description, price, imgUrl, categoryId } = req.body

      const result = await Cuisine.create({
        name,
        description,
        price,
        imgUrl,
        authorId: req.user.id,
        categoryId,
      })
      res.status(200).json({
        statusCode: 200,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  static async readCuisine(req, res, next) {
    try {
      const result = await Cuisine.findAll({
        include: User
      })
      res.status(200).json({
        statusCode: 200,
        data: result,
      })
    } catch (error) {
     next(error)
    }
  }

  static async searchCuisineById(req, res, next) {
    const { id } = req.params
    try {
      const cuisine = await Cuisine.findByPk(id)
      if (!cuisine) {
        return res.status(400).json({
          statusCode: 400,
          message: `cuisine by id ${id} is not found`,
        })
      }
      const result = await Cuisine.findAll({
        where: {
          id: `${id}`,
        },
      })

      res.status(200).json({
        statusCode: 200,
        message: "sucsessfully search cuisine by id",
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  static async deleteCuisine(req, res) {
    const { id } = req.params
    try {
      const result = await Cuisine.destroy({
        where: {
          id: `${id}`,
        },
      })

      res.status(200).json({
        statusCode: 200,
        message: "sucsessfully delete cuisine",
        data: result,
      })
    } catch (error) {
      console.log(error )
      statusCode = 500
      message = "internal server eror"

      if (error.name === "sequelizeValidationError") {
        statusCode = 404
        message = "Not Found"
      }

      res.status(statusCode).json({
        statusCode,
        message,
      })
    }
  }

  static async readCategories(req, res) {
    try {
      const categories = await Category.findAll()
      res.status(200).json({
        statusCode: 200,
        message: "sucsessfully read categories data",
        data: categories,
      })
    } catch (error) {
      statusCode = 500
      message = "internal server eror"

      res.status(statusCode).json({
        statusCode,
        message,
      })
    }
  }
}

module.exports = Controller
