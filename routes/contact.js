const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')

router.post("/", (req, res) => {
    console.log(req.body);
    const {address, subject, body, name} = req.body

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'dmatthew8282@gmail.com',
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.TOKEN,
        }
    });

    var emailFormat = 
    `<h2>From:</h2> 
    <p>${name} <br> ${address}</p>
    <h2>Message: </h2>
    <p style="white-space: pre-line;">
        ${body}
    </p>`

    var mailOptions = {
        from: 'dmatthew8282@gmail.com',
        to: 'dmatthew8282@gmail.com',
        subject: subject,
        html: emailFormat
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.json({msg: "There was an error sending the email. Please try again", color: "pink"})
        } else {
            res.json({msg: "Your email was sent", color: "aliceblue"})
        }
    })
  

    
})

module.exports = router