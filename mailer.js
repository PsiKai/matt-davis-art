const ejs = require("ejs")

const formData = require("form-data")
const Mailgun = require("mailgun.js")
const mailgun = new Mailgun(formData)
const mailer = mailgun.client({ username: "api", key: process.env.MAILGUN_API_KEY })

async function sendContactEmail({ address, subject, body, name }) {
  const emailContent = await ejs.renderFile("./email-templates/contact.ejs", { address, body, name })
  return mailer.messages.create(process.env.DOMAIN, {
    from: `contact@${process.env.DOMAIN}`,
    to: [process.env.EMAIL],
    subject: subject,
    html: emailContent,
  })
}

async function sendOrderConfirmationEmail({ ship, total, email, items }) {
  const emailContent = await ejs.renderFile("./email-templates/order-confirmation.ejs", {
    ship,
    total,
    items,
  })
  return mailer.messages.create(process.env.DOMAIN, {
    from: `orders@${process.env.DOMAIN}`,
    to: [email],
    subject: "Your purchase from Artist Matt Davis",
    html: emailContent,
  })
}

async function sendOrderNotificationEmail({ ship, total, name, items }) {
  const emailContent = await ejs.renderFile("./email-templates/order-request.ejs", {
    ship,
    total,
    items,
  })
  return mailer.messages.create(process.env.DOMAIN, {
    from: `orders@${process.env.DOMAIN}`,
    to: [process.env.EMAIL],
    subject: "New order from " + name,
    html: emailContent,
  })
}

module.exports = { sendContactEmail, sendOrderConfirmationEmail, sendOrderNotificationEmail }
