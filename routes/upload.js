const express = require("express")
const router = express.Router();
const fs = require("fs")
const path = require("path");

var galleryModel = require("../models/gallery")
var printModel = require("../models/prints")

router.post("/gallery", (req, res) => {
    if (req.files === null) {
        return res.status(400).json({msg: "No file was received"})
    }
    const file = req.files.file
    const {name} = file;

    file.mv(path.join(__dirname + `/uploads/${name.replace(/ /g, "-").toLowerCase()}`), err => {
        if(err) {
            console.error(err);
            return res.status(500).json({msg: "Error moving file", error: err});
        }
        var imgObj = {
            title: req.body.title,
            description: req.body.description,
            img: {
                data: fs.readFileSync(path.join(__dirname + "/uploads/" + name.replace(/ /g, "-").toLowerCase())),
                contentType: 'image/png'
                }
        }
        galleryModel.create(imgObj, (err, item) => {
            if (err) {
                console.log(err);
                res.send("Error uploading image")
            } else {
                item.save();
                res.send("Item uploaded to gallery")
                fs.unlinkSync(path.join(__dirname + "/uploads/" + name.replace(/ /g, "-")));
            }
        })
    })
})


router.post("/prints", (req, res) => {
    if (req.files === null) {
        return res.status(400).json({msg: "No file was received"})
    }

    const file = req.files.file
    const {name} = file;

    file.mv(`${__dirname}/uploads/${name.replace(/ /g, "-").toLowerCase()}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).json({msg: "Error moving file", error: err});
        }
        var imgObj = {
            title: req.body.title,
            stock: JSON.parse(req.body.stock),
            img: {
                data: fs.readFileSync(path.join(__dirname + "/uploads/" + name.replace(/ /g, "-").toLowerCase())),
                contentType: 'image/png'
                    }
            }
        printModel.create(imgObj, (err, item) => {
            if (err) {
                console.log(err);
                res.send("Error uploading image: ", err.message)
            } else {
                item.save();
                res.send("Item uploaded to prints")
                fs.unlinkSync(path.join(__dirname + "/uploads/" + name.replace(/ /g, "-")));
            }
        })
    })
})

module.exports = router;