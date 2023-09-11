const express = require("express")
const UserController = require("../controllers/userController")
const Controller = require("../controllers/controller")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const router = express.Router()

//USER INTERFACE
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/google-login", UserController.loginWithGoogle)

//MIDDLEWARE
router.use(authentication)

//APP INTERFACE
router.post("/cuisines", Controller.createCuisine)
router.get("/cuisines", Controller.readCuisine)
router.get("/cuisines/:id", Controller.searchCuisineById)
router.delete("/cuisines/:id",authorization, Controller.deleteCuisine)
router.get("/categories", Controller.readCategories)

module.exports = router
