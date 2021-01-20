const express = require("express");
const router = express.Router();

var galleryModel = require("../models/gallery")
var printModel = require("../models/prints")


router.post("/gallery", (req, res) => {
    galleryModel.deleteOne({title: req.body.name}, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Error deleting artwork"})
        } else {
            console.log("Artwork deleted");
           res.json({msg: `${req.body.name} was deleted`})
        }
    })
})

router.post("/prints", (req, res) => {
    printModel.deleteMany({title: [...req.body]}, (err) => {
        if (err) {
            console.log(err);
            res.json({msg: `There was a problem deleting the prints`, color: "lightpink"})
        } else {
            res.json({msg: `Prints ${req.body.toString()} were successfully deleted`, color: "aliceblue"})
        }
    })
})


module.exports = router