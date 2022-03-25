const express = require("express")
const router = express.Router();
const mongoose = require("mongoose")

var galleryModel = require("../models/gallery")
var printModel = require("../models/prints")

let art = {}

router.get("/", async (req, res) => {
    if (Object.keys(art).length > 0) {
        res.json(art)
        console.log("Already have art");
    } else {
        try {
            const prints = await printModel.find({ deletedAt: null })
            const gallery = await galleryModel.find({ deletedAt: null })
            console.log("Got art");
            res.json({ gallery, prints })
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Couldn't get art "})
        }
    }
})

router.get("/refresh", async (req, res) => {
    console.log("Refreshing");
    try {
        const prints = await printModel.find({ deletedAt: null })
        const gallery = await galleryModel.find({ deletedAt: null })
        console.log("Refreshed art");
        res.json({ gallery, prints })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Couldn't get art "})
    }
})

router.post("/availability", async (req, res) => {
    const artIds = req.body.map(art => mongoose.Types.ObjectId(art._id))
    const foundArt = await printModel.find({ _id: { $in: artIds } })
    const availableArt = req.body.reduce((avail, art) => {
        const available = foundArt.find(found => art._id == found._id)
        if (available) avail.push(art)
        return avail
    }, [])
    
    res.json({availableArt})
})

module.exports = router;
