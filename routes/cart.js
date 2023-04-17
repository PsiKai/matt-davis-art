const express = require("express")
const router = express.Router()

const { sendOrderNotificationEmail, sendOrderConfirmationEmail } = require("../mailer")
const { markItemsSold } = require("../utils/updateArtwork")

router.post("/checkout", (req, res) => {
  let total = null
  req.body.forEach(item => {
    total = total + +item.price * +item.quantity
  })
  res.json(total)
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
