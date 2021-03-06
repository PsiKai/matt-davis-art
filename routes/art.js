const express = require("express")
const router = express.Router();

var galleryModel = require("../models/gallery")
var printModel = require("../models/prints")

let art = {}

router.get("/", (req, res) => {
    // console.log(art);
    if (Object.keys(art).length > 0) {
        res.json(art)
        console.log("already have art");
    } else {
        console.log("getting art");
        const promise1 = galleryModel.find({}).exec()
        const promise2 = printModel.find({}).exec()
        Promise.all([promise1, promise2])
        .then(([result1, result2]) => {
            console.log("got art");
            art = {gallery: [...result1], prints: [...result2]}
            res.json(art)
        })
        .catch(err => {
            return res.status(400).json({
                error: "Couldn't get art"
            })
        })   
    }
})

router.get("/refresh", (req, res) => {
    console.log("refreshing");
    const promise1 = galleryModel.find({}).exec()
        const promise2 = printModel.find({}).exec()
        Promise.all([promise1, promise2])
        .then(([result1, result2]) => {
            // console.log(result1, result2);
            art = {gallery: [...result1], prints: [...result2]}
            res.json(art)
        })
        .catch(err => {
            return res.status(400).json({
                error: "Couldn't get art"
            })
        })
})

module.exports = router;