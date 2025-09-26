const userModel = require("../model/signup.model");
const bcrypt = require('bcrypt');
const sendEmail = require("../utils/send_email");
const generateOTP = require("../utils/otp");

const signupController = async (req, res, next) => {
  try {
    const { name, email, password, phone, image, role } = req.body;


    let otp = generateOTP();
    
    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create new user
    const user = new userModel({
      name,
      email,
      password: hash,  // store hashed password
      phone,
      image,
      role,
    });

    // Save user
    await user.save();
sendEmail(email, otp)
    // Respond
    return res.status(201).json({ success: true, message: "User created successfully", data: user });

  } catch (err) {
    next(err); // Pass error to your error-handling middleware
  }
};

module.exports = { signupController };