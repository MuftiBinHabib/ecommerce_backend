const express = require("express")
const { signupController } = require("../../../controller/authController")
const router = express.Router()
// http://localhost:3000/api/v1/auth/signup
router.post("/signup" , signupController);

module.exports = router