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