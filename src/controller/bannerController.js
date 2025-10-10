const bannerModel = require("../model/banner.model");

let addBannerController = async (req, res) => {
  let { link } = req.body;
  let { filename } = req.file;
  try {
    let banner = await new bannerModel({
      image: `${process.env.SERVER_URL}/${filename}`,
      link,
    });
    await banner.save();

    return res
      .status(201)
      .json({
        success: true,
        message: "banner created successful",
        data: banner,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

let deleteBannerController =async (req,res) =>{

    try {
        let {id} = req.params
         const banner = await bannerModel.findById(id); // banner is defined before delete
        
        await bannerModel.findByIdAndDelete(id)

        if (!banner) {
    return res.status(404).json({ success: false, message: "Banner ID not found" });
  }

        return res.status(200).json({success: true, message:"banner deleted successful"})
    } catch (error) {
         return res
      .status(500)
      .json({ success: false, message: error.message || error })
    }
}

module.exports = { addBannerController, deleteBannerController };
