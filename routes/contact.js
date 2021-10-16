const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

router.post("/", async (req, res) => {
    console.log(req.body);
    const {address, subject, body, name} = req.body
    var emailFormat = 
    `<h2>From:</h2> 
    <p>${name} <br> ${address}</p>
    <h2>Message: </h2>
    <p style="white-space: pre-line;">
        ${body}
    </p>`

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
        subject: subject,
        html: emailFormat
    }

    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.log(err);
            res.json({msg: "There was an error sending the email. Please try again", color: "pink"})
        } else {
            res.json({msg: "Your email was sent", color: "aliceblue"})  
            transporter.close()
        }
    })
})

module.exports = router