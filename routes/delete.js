const express = require("express");
const router = express.Router();
const {Storage} = require("@google-cloud/storage");
let auth
if(process.env.NODE_ENV !== 'production') {
    auth = require("../config/matt-gcp-oauth.json")
} else {
    auth = "google-credentials.json"
}
const storage = new Storage({keyFileName: auth});

const printBucket = "matt-d-prints"
const galleryBucket = "matt-d-gallery"

var galleryModel = require("../models/gallery")
var printModel = require("../models/prints")


router.post("/gallery", async (req, res) => {
    let { img, title, _id } = req.body
    img = decodeURIComponent(img.split("gallery/")[1])

    try {
        await storage.bucket(galleryBucket).file(img).delete()
        await galleryModel.deleteOne({_id: _id})
        res.json({msg: `${title} was deleted`})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error deleting artwork"})
    }
})

router.post("/prints", async (req, res) => {
    let { img, title, _id } = req.body
    img = decodeURIComponent(img.split("prints/")[1])

    try {
        await storage.bucket(printBucket).file(img).delete()
        await printModel.deleteOne({_id: _id})
        res.json({msg: `${title} was deleted`})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error deleting artwork"})
    }
})

module.exports = router
