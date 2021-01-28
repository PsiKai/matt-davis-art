const express = require("express");
const router = express.Router();
const {Storage} = require("@google-cloud/storage");
const storage = new Storage({keyFileName: "../config/matt-gcp-oauth.json"});

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
    console.log(req.body);
    const deletePrints = async () => {
        let errors = []
        for(const image of req.body) {
            var name = image.title.replace(/ /g, "-").toLowerCase() + "." + image.type
            await storage.bucket(printBucket).file(name).delete(err => {
                if (err) {
                    console.log(err);
                    errors.push(`Error: ${image.title} was not deleted from Google`)
                } else {
                    printModel.deleteOne({title: image.title}, (err) => {
                        if (err) {
                            console.log(err);
                            errors.push(`Error: ${image.title} was not deleted from MongoDB`)
                        }  
                    })
                }          
            })
            if (errors.length > 0) {
                return res.json({msg: errors[0]})
            }
            
        } 
    }
    const awaitAll = async () => {
        await deletePrints()
        res.json({msg: "Prints were deleted"})
    }
    awaitAll()
})


module.exports = router