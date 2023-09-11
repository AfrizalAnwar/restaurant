function erorHandler(error, req, res, next) {
  let statusCode = 500
  let message = "internal server error"

  //userController
  //------------ login_area -----------
  //eror when empty input
  if (error.message === "empty email") {
    statusCode = 400
    message = "email can't be empty"
  }
  if (error.message === "empty password") {
    statusCode = 400
    message = "password can't be empty"
  }

  //main eror
  if (error.message === "not valid") {
    statusCode = 401
    message = "invalid email or password"
  }
  //----------------- register_area----------------
  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    statusCode = 400
    message = error.errors[0].message
  }
  
  //-----------------------------------------------


  //middleware
  //--------------- authentication_area ------------------
  if (error.message === "unauthentic" || error.name === "JsonWebTokenError") {
    statusCode = 401
    message = "Token is invalid"
  }

  //------------- authorization_area --------------------

  if (error.message === "cannot_find") {
    statusCode = 404
    message = `cuisine not found`
  }

  if (error.message === "cannot_delete") {
    statusCode = 403
    message =
      "you don't have permission or your'e not admin to delete other user cuisine"
  }
  //-------------------------------------------------

  //controller
  //------------- createCuisine_area--------------
  if (error.name === "SequelizeValidationError") {
    statusCode = 400
    message = error.errors[0].message
  }

  res.status(statusCode).json({
    statusCode,
    message,
  })
  //-------------- readCuisine_area ---------------
  statusCode = 500
  message = "internal server eror"

  if (error.name === "sequelizeValidationError") {
    statusCode = 404
    message = "Not Found"
  }
  //-------------- searchCuisineById_area ---------------

  if (error.name === "sequelizeValidationError") {
    statusCode = 404
    message = "Not Found"
  }
  //------------------------------------------------



  //eror_engine & internal server error
  res.status(statusCode).json({
    statusCode,
    message,
  })
}

module.exports = erorHandler
