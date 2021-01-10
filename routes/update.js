const express = require("express")
const router = express.Router();

var galleryModel = require("../models/gallery")
var printModel = require("../models/prints")

router.post("/stock", (req, res) => {
    req.body.forEach(item => {
        printModel.updateOne({"title": item.title}, {"$set": {"stock": item.stock}}, (err) => {
            if (err) {
                console.log(err);
                res.send("Error: ", err.message)
                
            } else {
                console.log("Item Updated")
            }
        })
    })
    res.send("Items Successfully Updated");
})


router.post("/gallery", (req, res) => {
    
    var old = req.body.old.title
    var newTit = req.body.new.title
    var newDesc = req.body.new.description

    galleryModel.updateOne({title: old}, {title: newTit, description: newDesc}, err => {
        if (err) {
            res.status(500).send("Error updating item")
            console.log(err);
        } else {
            res.send("Updated")
            console.log("Item", old, "was updated");
        }
    })
})

module.exports = router;