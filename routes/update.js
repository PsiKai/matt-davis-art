const express = require("express")
const router = express.Router();

var galleryModel = require("../models/gallery")
var printModel = require("../models/prints")

router.post("/prints", async (req, res) => {
    let { _id, title, original, price, dimensions, position } = req.body
    dimensions = JSON.stringify(dimensions)

    try {
        await printModel.findOneAndUpdate({ _id }, { $set: { title, price, original, dimensions, position } })
        res.json({ msg: `Successfully updated artwork!` })
    } catch (error) {
        console.error(error);
        res.json({ msg: "There was an error updating this artwork" })
    }
})

router.post("/gallery", async (req, res) => {
    const { _id, title, medium, description, position } = req.body
    try {
        await galleryModel.findOneAndUpdate({ _id }, { $set: { title, medium, description, position } })
        res.json({ msg: `Successfully updated artwork!` })
    } catch (error) {
        console.error(error)
        res.json({ msg: "There was an error updating this artwork" })
    }
})

module.exports = router;
