const { User } = require("../models")
const { comparePassword } = require("../utility/bcrypt")
const { signToken } = require("../utility/jwt")
const { OAuth2Client } = require("google-auth-library")

class UserController {
  static async register(req, res, next) {
    try {
      const role = "admin"
      const { userName, email, password, phoneNumber, address } = req.body
      console.log(email)
      await User.create({
        userName,
        email,
        password,
        role,
        phoneNumber,
        address,
      })
      res.status(200).json({
        statusCode: 200,
        message: "sucsessfully register account",
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email,
        },
      })

      if (!email) {
        throw new Error("empty email")
      }

      if (!password) {
        throw new Error("empty password")
      }

      //comparing
      if (!user) {
        throw new Error("not valid")
      }
      const isPasswordValid = comparePassword(password, user.password)

      if (!isPasswordValid) {
        throw new Error("not valid")
      }
      //response with access token
      const access_token = signToken({
        id: user.id,
        role: user.role,
      })

      // console.log(user, "<<<<< ini username")
      res.status(200).json({
        statusCode: 200,
        message: "login sucsessfully",
        data: { name: user.userName, access_token },
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async loginWithGoogle(req, res) {
    try {
      const { google_token } = req.headers
      const client = new OAuth2Client()
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      const payload = ticket.getPayload()

      const [user, isCreate] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          userName: payload.name,
          email: payload.email,
          password: String(Math.random() * 6437),
          role: "staff",
        },
        hooks: false,
      })

      const access_token = signToken({
        id: user.id,
      })
      
      res.status(200).json({
        statusCode: 200,
        data: { name: user.userName, access_token },
      })

      // console.log(user, "<<< ini balikan model")
      // console.log("is create???", isCreate);
    } catch (error) {
      let statusCode = 500
      let message = "internal server error"

      res.status(statusCode).json({
        statusCode,
        message,
      })
    }
  }
}

module.exports = UserController
