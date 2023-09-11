const { Category, Cuisine, User } = require("../models")
const { verifyToken } = require("../utility/jwt")

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers
    if (!access_token) {
      throw new Error("unauthentic")
    }

    const payload = verifyToken(access_token)
    const findUser = await User.findByPk(payload.id)

    if (!findUser) {
      throw new Error("unauthentic")
    }

    req.user = {
      id: findUser.id,
      email: findUser.email,
      role: findUser.role,
    }
    next()
  } catch (error) {
    next(error)

    
  }
}

module.exports = authentication
