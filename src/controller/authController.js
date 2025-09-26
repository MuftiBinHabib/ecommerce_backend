const userModel = require("../model/signup.model");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/send_email");
const generateOTP = require("../utils/otp");

const signupController = async (req, res, next) => {
  try {
    const { name, email, password, phone, image, role } = req.body;

    let otp = generateOTP();

    const hash = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hash,
      phone,
      image,
      role,
      otp,
    });

    await user.save();
    sendEmail(email, otp);

    setTimeout( async() => {
      let otpremove =await userModel.findOneAndUpdate({email}, {otp:null},{new:true} )

      await otpremove.save().then(()=>{
        console.log("otp remove")
      })
    }, 60000);

    return res
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        data: user,
      });
  } catch (err) {
    next(err);
  }
};

const verifyOtpController = async (req, res, next) => {
 let{email, otp}=req.body;

  let user = await userModel.findOne({email})

  if(!user){
return res.status(404).json({success: false, message:"User Not Found"})

  }else{
    if(user.otp === otp){
let verify = await userModel.findOneAndUpdate({email}, {verify:true}, {new: true})

return res.status(200).json({success:true , message: "OTP verify successful", data:verify})
    } else{
      return res.status(404).json({success: false, message:"Otp Not Match"})
    }
  }

  return res.send(user)
};
module.exports = { signupController, verifyOtpController };
