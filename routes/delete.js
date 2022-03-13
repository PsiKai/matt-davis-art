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


router.post("/gallery", (req, res) => {
    const bucketName = req.body.name.replace(/ /g, "-").toLowerCase() + "." + req.body.type
    console.log(bucketName);
    storage.bucket(galleryBucket).file(bucketName).delete(err => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Error deleting artwork"})
        } else {
            galleryModel.deleteOne({title: req.body.name}, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({msg: "Error deleting artwork"})
                } else {
                    console.log("Artwork deleted");
                   res.json({msg: `${req.body.name} was deleted`})
                }
            })
        }
    }); 
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
