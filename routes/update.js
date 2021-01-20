const express = require("express")
const router = express.Router();

var galleryModel = require("../models/gallery")
var printModel = require("../models/prints")

router.post("/stock", (req, res) => {
    req.body.forEach(item => {
        printModel.updateOne({"title": item.title}, {"$set": {"stock": item.stock}}, (err) => {
            if (err) {
                console.log(err);
                res.json({msg: "Error updating stock"})
                
            } else {
                console.log("Item Updated")
                
            }
        })
    })
    // res.send("Items Successfully Updated");
    res.json({msg: `Updated stock amounts`})
})


router.post("/gallery", (req, res) => {
    
    var old = req.body.old.title
    var newTit = req.body.new.title
    var newDesc = req.body.new.description
    var newMed = req.body.new.medium

    galleryModel.updateOne({title: old}, {title: newTit, medium: newMed, description: newDesc}, err => {
        if (err) {
            res.status(500).send("Error updating item ", old)
            console.log("Error updating item ", old, err);
        } else {
            res.json({msg: `${old} was updated to ${newTit} ${newDesc}`})
            console.log(old, "was updated to ", newTit, newDesc);
        }
    })
})

module.exports = router;