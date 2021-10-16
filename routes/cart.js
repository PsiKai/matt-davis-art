const express = require("express")
const router = express.Router();

const nodemailer = require("nodemailer")
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const { orderConfirmation } = require("../email-templates/order-confirmation")
const { orderRequest } = require("../email-templates/order-req")
const { artwork } = require("../email-templates/artwork-cards")


router.post("/checkout", (req, res) => {
    let total = null;
    req.body.forEach(item => {
        total = total + (+item.price * +item.quantity)
    })
    res.json(total)
})


router.post("/purchase", async (req, res) => {
    const {ship, ship: { email, name }, items, total} = req.body
    var art = artwork(items)

    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
    )

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    })
    
    const accessToken = await oauth2Client.getAccessToken()
    
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        }
    });

    var mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: "New order from " + name,
        html: orderRequest(art, ship, total)
    }

    var mailOptions2 = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your purchase from Artist Matt Davis",
        html: orderConfirmation(art, ship, total)
    }

    var orderReq = transporter.sendMail(mailOptions)
    var orderConfirm = transporter.sendMail(mailOptions2)

    Promise.all([orderReq, orderConfirm])
        .then(([result1, result2]) => {
            console.log("Purchase emails sent");
            res.json({
                code: 200,
                heading: "Thank you for your purchase!", 
                msg: `Payment was received for $${total}. Please contact me if you don't receive a confirmation email.`
            })
        })
        .catch(err => {
            console.log(err);
            return res.json({
                code: 400,
                heading: "I'm sorry, the order was not received",
                msg: "Please check with paypal or your bank that the payment was made, then send me an email and I will make sure you get your order!"
            })
        })
        .finally(() => {
            transporter.close()
        })
})


module.exports = router