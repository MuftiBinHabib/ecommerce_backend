const express = require("express")
const router = express.Router()
// http://localhost:3000/api/v1/auth/signup
router.post("/signup" , (req,res)=>{
    return res.send("signup")
})

module.exports = router