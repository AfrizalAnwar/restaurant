const { Cuisine } = require("../models")

async function authorization(req, res, next) {
    try {
      const { id } = req.params
    const findCuisine = await Cuisine.findByPk(id)

    if (!findCuisine) {
      throw new Error("cannot_find")
    }

    if (findCuisine.authorId !== req.user.id) {
      if (req.user.role === "admin") {
        next()
      } else {
        throw new Error("cannot_delete")
      }
    } else {
      next()
    }
  } catch (error) {
      next(error)
//     let statusCode = 500
//   let message = "internal server error"
//     if (error.message === "cannot_find") {
//         statusCode = 404
//         message = `movie with not found`
//       }
    
//       if (error.message === "cannot_delete") {
//         statusCode = 403
//         message =
//           "you don't have permission to delete other user cuisine"
//       } 

//       res.status(statusCode).json({
//         statusCode,
//         message 
//       })
  }
}

module.exports = authorization
