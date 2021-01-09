if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require("multer");
const fileUpload = require("express-fileupload")
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose")
const nodemailer = require('nodemailer')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port " + port));

mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser: true, useUnifiedTopology: true}, err => {
        console.log('MongoDB connected');
    });

var galleryModel = require("./models/gallery")
var printModel = require("./models/prints")


app.get("/art", (req, res) => {
    const promise1 = galleryModel.find({}).exec()
    const promise2 = printModel.find({}).exec()
    Promise.all([promise1, promise2])
        .then(([result1, result2]) => {
            res.json({gallery: result1, prints: result2})
        })
        .catch(err => {
            return res.status(400).json({
                error: "Couldn't get art"
            })
        })
})


app.post("/cart/add", (req, res) => {
    var id = req.body.item
    var product = art.prints.filter(print => print.id === id)
    res.send(product[0]);
})

app.post("/cart/checkout", (req, res) => {
    var _5x8 = 0
    var _8x11 = 0
    var _18x24 = 0
    req.body.forEach(item => {
        _5x8 += +item.quantity.fiveEight
        _8x11 += +item.quantity.eightEleven
        _18x24 += +item.quantity.oneeightTwofour
    })
    var total = (_5x8 * 3) + (_8x11 * 5) + (_18x24 * 10)

    res.json(total)
})


app.post("/cart/purchase", (req, res) => {
    var total = req.body.total
    var address = req.body.ship
    var items = req.body.items
    var email = req.body.ship.email
    var prints = ""
    items.forEach(item => {
        var _5x8 = item.quantity.fiveEight;
        var _8x11 = item.quantity.eightEleven;
        var _18x24 = item.quantity.oneeightTwofour
        if (_5x8.length === 0) _5x8 = 0;
        if (_8x11.length === 0) _8x11 = 0;
        if (_18x24.length === 0) _18x24 = 0;
        var string = 
        `<div style='margin: 1rem 2rem; border: 1px solid black; padding: 1rem; border-radius: 1rem'>
            <h4>Print: ${item.title}</h4>
            <p>5x8: <b>${_5x8}</b></p>
            <p>8.5x11: <b>${_8x11}</b></p>
            <p>18x24: <b>${_18x24}</b></p>
        </div>`
        prints = prints.concat(string)
    })

    var emailFormat = 
    `<h1>You have a new order for prints!</h1>
    <h2>Order Details</h2>
    <h3>Email:</h3>
    <p>${email}</p>
    <h3>Shipping Address:</h3>
    <p>${address.add1}</p>
    <p>${address.add2}</p>
    <span>${address.city}</span>
    <span>${address.state}</span>
    <span>${address.zip}</span>
    <h3>Items Purchased:</h3>
    <div style='display: flex; flex-wrap: wrap; justify-content: flex-start'>
    ${prints}
    </div>
    <h3>Amount charged: $${total}</h3>`

    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'davidirvin47@gmail.com',
    //         pass: process.env.EMAIL_PASSWORD
    //     }
    // });

    // var mailOptions = {
    //     from: 'davidirvin47@gmail.com',
    //     to: req.body.ship.email,
    //     subject: "New order from " + req.body.ship.email,
    //     html: emailFormat
    // }

    // transporter.sendMail(mailOptions, (err, info) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("Email sent: " + info.response);
    //     }
    // })

    let transporter = nodemailer.createTransport({
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
        to: req.body.ship.email,
        subject: "New order from " + req.body.ship.email,
        html: emailFormat
    }

    transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Email sent: " + info.response);
            }
        })

    res.send("Purchase Completed. Payment received for $" + total)
})


app.post("/upload/gallery", (req, res) => {
    if (req.files === null) {
        return res.status(400).json({msg: "No file was received"})
    }

    const file = req.files.file;

    file.mv(`${__dirname}/uploads/${file.name.replace(/ /g, "-")}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }
        var imgObj = {
            title: req.body.title,
            description: req.body.description,
            img: {
                data: fs.readFileSync(path.join(__dirname + "/uploads/" + file.name.replace(/ /g, "-"))),
                contentType: 'image/png'
                }
        }
        galleryModel.create(imgObj, (err, item) => {
            if (err) {
                console.log(err);
                res.send("Error uploading image: ", err.message)
            } else {
                item.save();
                res.send("Item uploaded to gallery")
                fs.unlinkSync(path.join(__dirname + "/uploads/" + file.name.replace(/ /g, "-")));
            }
        })
    })
})


app.post("/upload/prints", (req, res) => {
    if (req.files === null) {
        return res.status(400).json({msg: "No file was received"})
    }

    const file = req.files.file;

    file.mv(`${__dirname}/uploads/${file.name.replace(/ /g, "-")}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }
        var imgObj = {
            title: req.body.title,
            stock: JSON.parse(req.body.stock),
            img: {
                data: fs.readFileSync(path.join(__dirname + "/uploads/" + file.name.replace(/ /g, "-"))),
                contentType: 'image/png'
                    }
            }
        printModel.create(imgObj, (err, item) => {
            if (err) {
                console.log(err);
                res.send("Error uploading image: ", err.message)
            } else {
                item.save();
                res.send("Item uploaded to prints")
                fs.unlinkSync(path.join(__dirname + "/uploads/" + file.name.replace(/ /g, "-")));
            }
        })
    })
})


app.post("/update/stock", (req, res) => {
    req.body.forEach(item => {
        printModel.updateOne({"title": item.title}, {"$set": {"stock": item.stock}}, (err) => {
            if (err) {
                console.log(err);
                res.send("Error: ", err.message)
                
            } else {
                console.log("Item Updated")
            }
        })
    })
    res.send("Items Successfully Updated");
})


app.post("/update/gallery", (req, res) => {
    
    var old = req.body.old.title
    var newTit = req.body.new.title
    var newDesc = req.body.new.description 

    galleryModel.updateOne({title: old}, {title: newTit, description: newDesc}, err => {
        if (err) {
            res.status(500).send("Error updating item")
            console.log(err);
        } else {
            res.send("Updated")
            console.log("Item ", old, " was updated");
        }
    })
})


app.post("/delete/gallery", (req, res) => {
    console.log(req.body.name);
    galleryModel.deleteOne({title: req.body.name}, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error deleting artwork")
        } else {
            console.log("Artwork deleted");
           res.send("Artwork deleted")
        }
    })
})