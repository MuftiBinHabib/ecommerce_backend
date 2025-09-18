const express = require("express")
const router = express.Router()
const api =require("./api")

//http://localhost:3000/api/v1
router.use(process.env.BASE_URL, api)

module.exports = router;