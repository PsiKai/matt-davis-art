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
    let { title, _id } = req.body
    const { destination } = req.params
    const model = require(`../models/${destination}`)

    try {
        await model.updateOne({ _id }, { deletedAt: Date.now() })
        res.json({msg: `${title} was deleted`})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error deleting artwork"})
    }
})

module.exports = router
