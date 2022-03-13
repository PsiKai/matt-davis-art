const express = require("express")
const router = express.Router();
const fs = require("fs")
const path = require("path");
const {Storage} = require("@google-cloud/storage")
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
    console.log(req.body);
    if (req.files === null) {
        return res.status(400).json({msg: "No file was received"})
    }
    const file = req.files.file
    const {name} = file;
    const type = name.split(".")[1]
    const dirFileName = name.replace(/ /g, "-").toLowerCase()
    const cloudName = req.body.title.replace(/ /g, "-").toLowerCase()

    file.mv(path.join(__dirname + `/uploads/${dirFileName}`), err => {
        if(err) {
            console.error(err);
            return res.status(500).json({msg: "Error moving file", error: err});
        }
        var imgObj = {
            title: req.body.title,
            medium: req.body.medium,
            description: req.body.description,
            type: type,
            sold: false,
            img: `https://storage.googleapis.com/${galleryBucket}/${cloudName}.${type}`
        }
        
        console.log(imgObj.img);
        const googleUploadGallery = () => {
            storage.bucket(galleryBucket).upload(`routes/uploads/${dirFileName}`, {destination: cloudName + "." + type}, (err) => {
                if (err) {
                    console.log(err);
                    res.json({msg: "Error uploading file to google", color: "var(--medium)"})
                } else {
                    uploadGallery();
                }
            })
        }

        const uploadGallery = () => {
            galleryModel.create(imgObj, (err, item) => {
                if (err) {
                    console.log(err);
                    res.json({msg: "Error uploading image to mongo"})
                } else {
                    item.save();
                    res.json({msg: `${imgObj.title} was uploaded to gallery`})
                    fs.unlinkSync(path.join(__dirname + "/uploads/" + name.replace(/ /g, "-").toLowerCase()));
                }
            })
        }
        
        googleUploadGallery();
    })
})


router.post("/prints", async (req, res) => {
    if (!req.files) res.status(400).json({msg: "No file was received"})

    const { title, original, price, dimensions, position } = req.body
    const { file: { name }, file } = req.files
    const dirFileName = encodeURIComponent(name)
    const type = name.split(/\.(?=[^\.]+$)/)[1]
    const newName = title + "." + type
    const cloudName = encodeURIComponent(newName)
    const img = encodeURI(`https://storage.googleapis.com/${printBucket}/${cloudName}`)
    var imgObj = { title, original, price, dimensions, type, soldOut: false, img, position }
    const localPath = path.join(__dirname, '/uploads/', dirFileName)

    try {
        await file.mv(localPath)
        await storage.bucket(printBucket).upload(localPath, {destination: cloudName})
        await printModel.create(imgObj)
        res.json({msg: `${title} was uploaded to the store!`})
    } catch (error) {
        console.log(error)
        res.json({msg: `There was an error uploading ${title}`})
    } finally {
        const localFile = fs.existsSync(localPath)
        if (localFile) fs.unlinkSync(localPath)
    }
})

module.exports = router;
