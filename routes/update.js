const express = require("express")
const router = express.Router();

var galleryModel = require("../models/gallery")
var printModel = require("../models/prints")

router.post("/prints", async (req, res) => {
    const { _id, title, original, price, dimensions, position } = req.body

    try {
        await printModel.findOneAndUpdate(
            {"_id": _id}, 
            {"$set": {
                "title": title,
                "price": price,
                "original": original,
                "dimensions": JSON.stringify(dimensions),
                "position": position
            }}
        )    
        res.json({msg: `Successfully updated artwork!`})
    } catch (error) {
        console.log(error);
        res.json({msg: "There was an error updating this artwork"})   
    }
})


router.post("/gallery", async (req, res) => {
    const { _id, title, medium, description, position } = req.body

    try {
        await galleryModel.findOneAndUpdate(
            {"_id": _id},
            { "$set": { 
                "title": title,
                "mediume": medium,
                "description": description,
                "position": position
            }}
        )
        res.json({msg: `Successfully updated artwork!`})
    } catch (error) {
        console.log(error)
        res.json({msg: "There was an error updating this artwork"})
    }
})

module.exports = router;