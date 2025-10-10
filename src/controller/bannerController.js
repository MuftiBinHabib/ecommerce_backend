 let addBannerController = async(req, res) =>{
    console.log(req.body)

    return res.send(req.file)
}

module.exports = {addBannerController}