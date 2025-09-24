const userModel = require("../model/signup.model");
const bcrypt = require('bcrypt');
const signupController = async (req, res, next) => {
  let { name, email, password, phone, image, role } = req.body;
bcrypt.hash(password, 10, async function (err,hash){
  // Store hash in your password DB.
    let user = new userModel({
      name,
      email,
      password,
      phone,
      image,
      role,
    });
  
    await user.save().then(() =>{
  
        return res.status(201).json({success:true, message:"user created successfully" , data: user})
        .catch((err) =>{
          next(err);
        });
  })
})

  
};

module.exports = { signupController };
