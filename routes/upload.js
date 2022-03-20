const express = require("express")
const router = express.Router();
const fs = require("fs")
const path = require("path");
const sharp = require("sharp")

let auth 
if(process.env.NODE_ENV !== 'production') {
    auth = process.env.GOOGLE_APPLICATION_CREDENTIALS
} else {
    auth = "google-credentials.json"
}

const {Storage} = require("@google-cloud/storage")
const storage = new Storage({keyFileName: auth});

router.post("/:destination", async (req, res) => {
    if (!req.files) res.status(400).json({msg: "No file was received"})

    const { destination } = req.params
    const { title } = req.body
    const { file: { data } } = req.files

    const bucket = `matt-d-${destination}`
    const model = require(`../models/${destination}`)

    const newName = title + Date.now() + ".webp"
    const dirFileName = encodeURIComponent(newName)
    const localPath = path.join(__dirname, '/uploads/', dirFileName)
    const img = encodeURI(`https://storage.googleapis.com/${bucket}/${dirFileName}`)

    var imgObj = buildImgObject(req.body, destination)
    imgObj = {...imgObj, img}

    const resDestination = destination === "gallery" ? destination : "store"

    try {
        await sharp(data).webp().toFile(localPath)
        await storage.bucket(bucket).upload(localPath, {destination: dirFileName})
        await model.create(imgObj)
        res.json({msg: `${title} was uploaded to the ${resDestination}!`})
    } catch (error) {
        console.log(error)
        res.json({msg: `There was an error uploading ${title}`})
    } finally {
        const localFile = fs.existsSync(localPath)
        if (localFile) fs.unlinkSync(localPath)
    }
})

const buildImgObject = (reqBody, destination) => {
    if (destination === "gallery") {
        const { title, description, medium, position } = reqBody
        return { title, description, medium, position }
    } else {
        const { title, original, price, dimensions, position } = reqBody
        return { title, original, price, dimensions, position }
    }
}

module.exports = router;
