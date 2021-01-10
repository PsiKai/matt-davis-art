const express = require("express")
const router = express.Router();

var galleryModel = require("../models/gallery")
var printModel = require("../models/prints")

router.get("/", (req, res) => {
    const promise1 = galleryModel.find({}).exec()
    const promise2 = printModel.find({}).exec()
    Promise.all([promise1, promise2])
        .then(([result1, result2]) => {
            res.json({gallery: result1, prints: result2})
        })
        .catch(err => {
            return res.status(400).json({
                error: "Couldn't get art"
            })
        })
})

module.exports = router;