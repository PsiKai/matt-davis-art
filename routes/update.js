const express = require("express")
const router = express.Router();
const {Storage} = require("@google-cloud/storage");
let auth 
if(process.env.NODE_ENV !== 'production') {
    auth = "../config/matt-gcp-oauth.json"
} else {
    auth = "google-credentials.json"
}
const storage = new Storage({keyFileName: auth});

const galleryBucket = "matt-d-gallery"

var galleryModel = require("../models/gallery")
var printModel = require("../models/prints")

router.post("/stock", (req, res) => {
    const { _id, title, original, price, dimensions, position } = req.body
    printModel.findOneAndUpdate(
        {"_id": _id}, 
        {"$set": {
            "title": title,
            "price": price,
            "original": original,
            "dimensions": JSON.stringify(dimensions),
            "position": position
        }},
        (err) => {
            if (err) {
                console.log(err);
                res.json({msg: "There was an error updating this artwork"})
            } else {
                res.json({msg: `Successfully updated artwork!`})
            }
        })
})


router.post("/gallery", async (req, res) => {
    
    var old = req.body.old.title
    var type = req.body.old.type
    var newTit = req.body.new.title
    var newDesc = req.body.new.description
    var newMed = req.body.new.medium
    const editFile = async () => {
        await storage.bucket(galleryBucket)
            .file(old.replace(/ /g, "-").toLowerCase() + "." + type)
            .move(newTit.replace(/ /g, "-").toLowerCase() + "." + type)
        await galleryModel.updateOne({title: old},
            {title: newTit, medium: newMed, description: newDesc})
    }

    try {
        await editFile()
        res.json({msg: `${old} was updated to ${newTit} ${newDesc}`})
        console.log(old, "was updated to ", newTit, newDesc);
    } catch (error) {
        res.json({msg: "Error updating item ", old})
        console.log(error);
    } 
    
})

module.exports = router;