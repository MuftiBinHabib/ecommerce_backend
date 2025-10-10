const express = require("express");
const { addBannerController } = require("../../../controller/bannerController");

const router = express.Router()
// http://localhost:3000/api/v1/auth/signup
router.post("/addbanner", addBannerController);

module.exports = router; 