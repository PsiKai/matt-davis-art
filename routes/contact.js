const express = require("express")
const router = express.Router()
const { sendContactEmail } = require("../mailer")
const { contactFormSanitizer } = require("../middleware/input-sanitizer")

router.post("/", contactFormSanitizer(), async (req, res) => {
  const { address, subject, body, name } = req.body

  try {
    const emailSender = await sendContactEmail({ address, subject, body, name })
    console.log("CONTACT_EMAIL_SENT", emailSender)
    res.json({ msg: "Your email was sent", color: "aliceblue" })
  } catch (error) {
    console.error("CONTACT_EMAIL_SEND_ERROR", error)
    res.status(500).json({ msg: "There was an error sending the email", color: "pink" })
  }
})

module.exports = router
