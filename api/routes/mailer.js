const express = require("express")
const router = express.Router()

const { sendContactEmail, sendOrderNotificationEmail, sendOrderConfirmationEmail } = require("../../mailer")
const { contactFormSanitizer } = require("../../middleware/input-sanitizer")
const { markItemsSold } = require("../../utils/updateArtwork")

router.post("/contact", contactFormSanitizer(), async (req, res) => {
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

router.post("/purchase", async (req, res) => {
  const {
    ship,
    ship: { email, name },
    items,
    total,
  } = req.body

  try {
    await markItemsSold(items)
  } catch (error) {
    console.error("MARK_ITEMS_SOLD_ERROR", error)
  }

  const orderRequest = sendOrderNotificationEmail({ ship, total, name, items })
  const orderConfirm = sendOrderConfirmationEmail({ ship, total, email, items })

  Promise.all([orderRequest, orderConfirm])
    .then(([result1, result2]) => {
      console.log("ORDER_EMAILS_SENT", result1, result2)
      res.json({
        code: 200,
        heading: "Thank you for your purchase!",
        msg: `Payment was received for $${total}. Please contact me if you don't receive a confirmation email.`,
      })
    })
    .catch(err => {
      console.log(err)
      return res.json({
        code: 500,
        heading: "I'm sorry, an error occurred",
        msg: `There was an issue sending the order confirmation emails. Please contact me directly at ${process.env.EMAIL}`,
      })
    })
})

module.exports = router
