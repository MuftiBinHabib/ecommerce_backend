const express = require("express");
const { addBannerController } = require("../../../controller/bannerController");
const multer  = require('multer')
const router = express.Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    console.log(file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

    let fileextension = file.originalname.split(".")
    let extension = fileextension[fileextension.length-1]
    cb(null, file.fieldname + '-' + uniqueSuffix + extension)
  }
})

const upload = multer({ storage: storage })

// http://localhost:3000/api/v1/auth/signup
router.post("/addbanner", upload.single("banner"),addBannerController);

module.exports = router; 