const jwt = require('jsonwebtoken')

let TokenCheckMiddleware = (req,res,next) =>{
    let {token} = req.headers;
    
    try {
        jwt.verify(token, process.env.PRIVATE_KEY, function(err, decoded) {
  if(err){
    return res.status(400).json({ success : false, message: err.message })

  } else {
    req.userdata = decoded
    next()
  }
});
    } catch (error) {
     return res.status(500).json({sucess: false, message: err.message })
    }
    
}

let adminCheck = (req,res,next)=>{
   if (req.userdata.role== "admin"){
next()
   } else{
    return res.status(400).json({ success:false, message:"access denied"})
   }

}
module.exports = { TokenCheckMiddleware, adminCheck}