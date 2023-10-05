const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

var galleryModel = require("../../models/gallery")
var printModel = require("../../models/prints")

let art = {}

router.get("/", async (req, res) => {
  if (Object.keys(art).length > 0) {
    res.status(200).json(art)
    console.log("Using art cache")
  } else {
    console.log("Art cache is empty")
    try {
      const artWork = await getAllArt()
      art = artWork
      res.json(art)
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: "Couldn't get art" })
    }
  }
})

router.get("/refresh", async (req, res) => {
  console.log("Invalidating art cache")
  try {
    const artWork = await getAllArt()
    art = artWork
    res.status(200).json(art)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Couldn't get art " })
  }
})

router.post("/availability", async (req, res) => {
  try {
    const artIds = req.body.map(art => mongoose.Types.ObjectId(art._id))
    const foundArt = await printModel.find({ _id: { $in: artIds } })
    const availableArt = req.body.reduce((avail, art) => {
      const available = foundArt.find(found => art._id == found._id)
      if (available) avail.push(art)
      return avail
    }, [])
    res.status(200).json({ availableArt })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Could not refresh cart" })
  }
})

router.post("/price", async (req, res) => {
  try {
    const artIds = req.body.map(art => mongoose.Types.ObjectId(art._id))
    const foundArt = await printModel.find({
      _id: { $in: artIds },
      soldOut: false,
    })
    const total = foundArt.reduce((acc, art) => (acc += art.price), 0)
    res.status(200).json(total)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Error getting prices" })
  }
})

const getAllArt = async () => {
  const [gallery, prints] = await Promise.all([
    galleryModel.find({ deletedAt: null }).sort("-createdAt"),
    printModel.find({ deletedAt: null }),
  ])
  return { gallery, prints }
}

module.exports = router
