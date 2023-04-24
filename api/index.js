const express = require("express")
const router = express.Router()
const galleryRouter = require("./routes/gallery")
const printRouter = require("./routes/store")
const userRouter = require("./routes/user")
const artworkRouter = require("./routes/artwork")
const mailerRouter = require("./routes/mailer")

router.use("/gallery", galleryRouter)
router.use("/store", printRouter)
router.use("/user", userRouter)
router.use("/artwork", artworkRouter)
router.use("/mailer", mailerRouter)

module.exports = router
