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

router.post("/gallery", async (req, res) => {
    if (!req.files) res.status(400).json({msg: "No file was received"})

    const { title, description, medium, position } = req.body
    const { file: { name }, file } = req.files
    const dirFileName = encodeURIComponent(name)
    const type = name.split(/\.(?=[^\.]+$)/)[1]
    const newName = title + Date.now() + "." + type
    const cloudName = encodeURIComponent(newName)
    const img = encodeURI(`https://storage.googleapis.com/${galleryBucket}/${cloudName}`)
    var imgObj = { title, description, medium, type, img, position }
    const localPath = path.join(__dirname, '/uploads/', dirFileName)

    try {
        await file.mv(localPath)
        await storage.bucket(galleryBucket).upload(localPath, {destination: cloudName})
        await galleryModel.create(imgObj)
        res.json({msg: `${title} was uploaded to the gallery!`})
    } catch (error) {
        console.log(error)
        res.json({msg: `There was an error uploading ${title}`})
    } finally {
        const localFile = fs.existsSync(localPath)
        if (localFile) fs.unlinkSync(localPath)
    }
})


router.post("/prints", async (req, res) => {
    if (!req.files) res.status(400).json({msg: "No file was received"})

    const { title, original, price, dimensions, position } = req.body
    const { file: { name }, file } = req.files
    const dirFileName = encodeURIComponent(name)
    const type = name.split(/\.(?=[^\.]+$)/)[1]
    const newName = title + Date.now() + "." + type
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
