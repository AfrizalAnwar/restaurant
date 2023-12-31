require('dotenv').config()
const express = require("express")
var cors = require('cors')
const router = require("./routers/")
const erorHandler = require("./utility/erorHandler")
const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(router)
app.use(erorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
