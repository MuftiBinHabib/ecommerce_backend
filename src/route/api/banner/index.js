const express = require("express");
const { addBannerController, deleteBannerController } = require("../../../controller/bannerController");
const multer  = require('multer')
const router = express.Router()

const path = require('path');
const { TokenCheckMiddleware, adminCheck } = require("../../../utils/authMiddleware");

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


function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only! (jpeg, jpg, png, gif)');
  }
}

const upload = multer({ storage: storage, fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
 })

// http://localhost:3000/api/v1/auth/signup
router.post("/addbanner",TokenCheckMiddleware,adminCheck, upload.single("banner"),addBannerController);
router.delete("/deletebanner/:id",TokenCheckMiddleware,adminCheck,deleteBannerController)


module.exports = router; 