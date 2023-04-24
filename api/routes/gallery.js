const express = require("express")
const router = express.Router()
const fs = require("fs")
const path = require("path")
const sharp = require("sharp")
const Gallery = require("../../models/gallery")
const auth = require("../../middleware/auth")
const storage = require("../../googleClient")

router.get("/", async (req, res) => {
  try {
    const prints = await Gallery.find({ deletedAt: null })
    res.status(200).json(prints)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Error getting prints" })
  }
})

router.post("/", auth, async (req, res) => {
  if (!req.files) res.status(400).json({ msg: "No file was received" })

  const { title, medium, description, position } = req.body
  const {
    file: { data },
  } = req.files

  const bucket = "matt-d-gallery"
  const newName = title + Date.now() + ".webp"
  const dirFileName = encodeURIComponent(newName)
  const localPath = path.join(__dirname, "../uploads/", dirFileName)
  const img = encodeURI(`https://storage.googleapis.com/${bucket}/${dirFileName}`)
  const imgObj = { title, medium, description, position, img }

  try {
    await sharp(data).webp().toFile(localPath)
    await storage
      .bucket(bucket)
      .upload(localPath, { destination: dirFileName, metadata: { cacheControl: "max-age=86400" } })
    await Gallery.create(imgObj)
    res.status(201).json({ msg: `${title} was uploaded to the store!` })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: `There was an error uploading ${title}` })
  } finally {
    const localFile = fs.existsSync(localPath)
    if (localFile) fs.unlinkSync(localPath)
  }
})

router.patch("/:_id", auth, async (req, res) => {
  const { title, original, price, dimensions, position } = req.body
  const { _id } = req.params
  dimensions = JSON.stringify(dimensions)

  try {
    await Gallery.findOneAndUpdate({ _id }, { $set: { title, price, original, dimensions, position } })
    res.status(204).json({ msg: `Successfully updated artwork!` })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "There was an error updating this artwork" })
  }
})

router.delete("/:_id", auth, async (req, res) => {
  const { _id } = req.params

  try {
    await Gallery.updateOne({ _id }, { deletedAt: Date.now() })
    res.status(200).json({ msg: `Artwork successfully deleted` })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Error deleting artwork" })
  }
})

module.exports = router
