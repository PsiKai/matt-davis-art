const express = require("express")
const router = express.Router();
const nodemailer = require("nodemailer")
var printModel = require("../models/prints")


router.post("/checkout", (req, res) => {
    let total = null;
    req.body.forEach(item => {
        total = total + (+item.price * +item.quantity)
    })
    // var _5x8 = 0
    // var _8x11 = 0
    // var _18x24 = 0
    // req.body.forEach(item => {
    //     _5x8 += +item.quantity.fiveEight
    //     _8x11 += +item.quantity.eightEleven
    //     _18x24 += +item.quantity.oneeightTwofour
    // })
    // var total = (_5x8 * 1) + (_8x11 * 1) + (_18x24 * 1)

    res.json(total)
})


router.post("/purchase", (req, res) => {
    const {ship, items, total} = req.body
    const {name2, email, name, add1, add2, zip, state, city} = ship
    var prints = ""
    items.forEach(item => {
        const {width, height} = JSON.parse(item.dimensions)
        var string = 
        `<div style='margin: 0.5rem; border: 1px solid black; padding: 1rem; border-radius: 0.5rem; background: lightgrey; min-width: 150px; display: inline-block;'>
            <h4>${item.title}</h4>
            <img src=${item.img} alt=${item.title} style="width: 100px; height: 100px; object-fit: cover;" />
            <p>Size: ${width}" x ${height}"</p>
        </div>`
        prints = prints.concat(string)
        if (item.original === true) {
            printModel.findOneAndUpdate({title: item.title}, {soldOut: true}, err => {
                if (err) {
                    console.log("Did not update original stock");
                } else {
                    console.log("Artwork sold!");
                }
               
            })
        }
    })

    var emailFormat = 
    `<div style="background-color: #f9f9f9; color: #305973; font-family: sans-serif; padding: 1rem;">
        <h1>You have a new order for Art!</h1>
        <div style="max-width: 500px; padding: 0 2rem; border: 1px solid black; border-radius: 1rem; margin: 1rem;">    
            <h2>Order Details:</h2>
            <div style="padding: 1rem 2rem;">
                <h3>Purchaser:</h3>
                <div style="margin-left: 3rem;">
                    <p>${name2}</p>
                    <p>${email}</p>
                </div>
                <h3>Shipping Address:</h3>
                <div style="margin-left: 3rem;">
                    <p>${name}</p>
                    <p style="margin-bottom: 0.5rem;">${add1}</p>
                    <p style="margin: 0.5rem 0;">${add2}</p>
                    <span>${city},</span>
                    <span>${state}</span>
                    <span>${zip}</span>
                </div>
                <h3>Items Purchased:</h3>
                <div style="text-align: center">
                    ${prints}
                </div>
                <h3>Amount charged: $${total}</h3>
            </div>
        </div>
    </div>`

    var emailFormat2 = 
    `<div style="background-color: #f9f9f9; color: #305973; font-family: sans-serif; padding: 1rem;">
        <h1>Thank you for your purchase, ${name2}!</h1>
        <div style="max-width: 500px; padding: 0 2rem; border: 1px solid black; border-radius: 1rem; margin: 1rem;">    
            <h2>Order Details:</h2>
            <div style="padding: 1rem;">
                <h3>Shipping Address:</h3>
                <div style="margin-left: 3rem;">
                    <p>${name}</p>
                    <p style="margin-bottom: 0.5rem;">${add1}</p>
                    <p style="margin: 0.5rem 0;">${add2}</p>
                    <span>${city},</span>
                    <span>${state}</span>
                    <span>${zip}</span>
                </div>
                <h3>Art Purchased:</h3>
                <div style="text-align: center">
                    ${prints}
                </div>
                <h3>Amount charged: $${total}</h3>
                <p>Please reach out to me if any of the information doesn't look correct.</p>
            </div>
        </div>
        <div style="max-width: 500px;">
            <h2>Thank you so much for supporting my art!</h2>
            <p>I'm grateful that I get to make art, and even more grateful to be able to share it with you.  People like you who patronize the arts are what's going to keep this world fun and interesting.</p>
            <p>Stay tuned for more art to be posted to the website.  Hope to hear from you again.</p>
            <p>Your friend,</p>
            <h3>Matt Davis</h3>
        </div>
    </div>`

    let transporter = nodemailer.createTransport({
        service: "Gmail",
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        }
    });

    transporter.on("token", token => {
        console.log(token.user, token.accessToken, token.expires);
    })

    var mailOptions = {
        from: 'dmatthew8282@gmail.com',
        to: 'dmatthew8282@gmail.com',
        subject: "New order from " + name,
        html: emailFormat,
        auth: {
            user: 'dmatthew8282@gmail.com',
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.TOKEN,
        }
    }

    var mailOptions2 = {
        from: 'dmatthew8282@gmail.com',
        to: email,
        subject: "Your purchase from Artist Matt Davis",
        html: emailFormat2,
        auth: {
            user: 'dmatthew8282@gmail.com',
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.TOKEN,
        }
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