const express = require("express")
const router = express.Router()
const { hasSharedResource } = require("../data/helpers/mongodb")

let auth
if(process.env.NODE_ENV !== 'production') {
    auth = process.env.GOOGLE_APPLICATION_CREDENTIALS
} else {
    auth = "google-credentials.json"
}
const {Storage} = require("@google-cloud/storage")
const storage = new Storage({keyFileName: auth})

router.post("/:destination", async (req, res) => {
    let { img, title, _id } = req.body
    const { destination } = req.params

    img = decodeURIComponent(img.split(`${destination}/`)[1])

    const bucket = `matt-d-${destination}`
    const model = require(`../models/${destination}`)

    try {
        const isShared = await hasSharedResource(img, destination)
        if (!isShared) await storage.bucket(bucket).file(img).delete()
        await model.deleteOne({_id: _id})
        res.json({msg: `${title} was deleted`})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error deleting artwork"})
    }
})

module.exports = router
