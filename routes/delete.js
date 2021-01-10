const express = require("express");
const multer = require("multer");
const router = express.Router();

var galleryModel = require("../models/gallery")
var printModel = require("../models/prints")


router.post("/gallery", (req, res) => {
    galleryModel.deleteOne({title: req.body.name}, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error deleting artwork")
        } else {
            console.log("Artwork deleted");
           res.send("Artwork deleted")
        }
    })
})


module.exports = router