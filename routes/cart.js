const express = require("express")
const router = express.Router();
const nodemailer = require("nodemailer")


router.post("/checkout", (req, res) => {
    var _5x8 = 0
    var _8x11 = 0
    var _18x24 = 0
    req.body.forEach(item => {
        _5x8 += +item.quantity.fiveEight
        _8x11 += +item.quantity.eightEleven
        _18x24 += +item.quantity.oneeightTwofour
    })
    var total = (_5x8 * 1) + (_8x11 * 1) + (_18x24 * 1)

    res.json(total)
})


router.post("/purchase", (req, res) => {
    const {ship, items, total} = req.body
    const {email, name, add1, add2, zip, state, city} = ship
    var prints = ""
    items.forEach(item => {
        var _5x8 = item.quantity.fiveEight;
        var _8x11 = item.quantity.eightEleven;
        var _18x24 = item.quantity.oneeightTwofour
        if (_5x8.length < 1) _5x8 = 0;
        if (_8x11.length < 1) _8x11 = 0;
        if (_18x24.length < 1) _18x24 = 0;
        var string = 
        `<div style='margin: 1rem; border: 1px solid black; padding: 1rem; border-radius: 0.5rem; background: lightgrey; min-width: 150px; display: inline-block;'>
            <h4>Print: ${item.title}</h4>
            <p>5x8: <b>${_5x8}</b></p>
            <p>8.5x11: <b>${_8x11}</b></p>
            <p>18x24: <b>${_18x24}</b></p>
        </div>`
        prints = prints.concat(string)
    })

    var emailFormat = 
    `<h1>You have a new order for prints!</h1>
    <div style="max-width: 100%; padding: 2rem; border: 1px solid black; border-radius: 1rem; margin: 1rem;">    
        <h2>Order Details:</h2>
        <div style="padding: 1rem 2rem;">
            <h3>Purchaser:</h3>
            <p>${name}</p>
            <p>${email}</p>
            <h3>Shipping Address:</h3>
            <p>${name}</p>
            <p>${add1}</p>
            <p>${add2}</p>
            <span>${city}</span>
            <span>${state}</span>
            <span>${zip}</span>
            <h3>Items Purchased:</h3>
            <div style="text-align: center">
                ${prints}
            </div>
            <h3>Amount charged: $${total}</h3>
        </div>
    </div>`

    var emailFormat2 = 
    `<h1>Thank you for your Purchase!</h1>
    <div style="max-width: 100%; padding: 2rem; border: 1px solid black; border-radius: 1rem; margin: 1rem;">    
        <h2>Order Details:</h2>
        <div style="padding: 1rem 2rem;">
            <h3>Shipping Address:</h3>
            <p>${name}</p>
            <p>${add1}</p>
            <p>${add2}</p>
            <span>${city}</span>
            <span>${state}</span>
            <span>${zip}</span>
            <h3>Items Purchased:</h3>
            <div style="text-align: center">
                ${prints}
            </div>
            <h3>Amount charged: $${total}</h3>
            <p>Please reach out to me if any of the information doesn't look correct.</p>
        </div>
    </div>
    <h2>Thank you so much for supporting my art!</h2>
    <p>I'm grateful that I get to make art, and even more grateful to be able to share it with you.  People like you who patronize the arts are what's going to keep this world fun and interesting.</p>
    <p>Stay tuned for more art to be posted to the website.  Hope to hear from you again.</p>
    <p>Your friend,</p>
    <h3>Matt Davis</h3>
    <a style="margin: 1rem" href="https://www.instagram.com/mattdavisart5280/">
        Instagram
    </a>
    <a style="margin: 1rem" href="https://www.facebook.com/matthew.davis.5437">
        Facebook
    </a>`

    let transporter = nodemailer.createTransport({
        // service: 'gmail',
        // auth: {
        //     user: 'davidirvin47@gmail.com',
        //     pass: "12345"
        // }
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'davidirvin47@gmail.com',
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.TOKEN,
        }
    });


    var mailOptions = {
        from: 'davidirvin47@gmail.com',
        to: 'davidirvin47@gmail.com',
        subject: "New order from " + name,
        html: emailFormat
    }

    var mailOptions2 = {
        from: 'davidirvin47@gmail.com',
        to: email,
        subject: "Your purchase from Artist Matt Davis",
        html: emailFormat2
    }

    var orderReq = transporter.sendMail(mailOptions)

    var orderConfirm = transporter.sendMail(mailOptions2)


    Promise.all([orderReq, orderConfirm])
        .then(([result1, result2]) => {
            console.log("Emails sent", result1, result2);
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
})


module.exports = router