const express = require("express");
const router = express.Router();
const {Storage} = require("@google-cloud/storage");
let auth 
if(process.env.NODE_ENV !== 'production') {
    auth = "../config/matt-gcp-oauth.json"
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

router.post("/prints", (req, res) => {
    let promises = []
    req.body.forEach(image => {
        var name = image.title.replace(/ /g, "-").toLowerCase() + "." + image.type
        var google = storage.bucket(printBucket).file(name).delete()
        var mongo = printModel.deleteOne({title: image.title}).exec()
        promises.push(google, mongo)
    })

    Promise.all([...promises])
        .then(console.log("deleting"))
        .catch(err => res.json({msg: err}))
        .finally(res.json({msg: "Artwork deleted"}))
})

module.exports = router