const { default: mongoose } = require("mongoose");
const bcrypt =require('bcrypt');
const bannerSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, "image is required"],
        
    },
     link: {
        type: String,
        required: [true, "image link is required"],
        
    },
}, {timestamps:true})





module.exports = mongoose.model("Banner" , bannerSchema)