if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const art = require('./art');

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port " + port));


app.get("/art", (req, res) => {
    res.json({art});
    // res.send("connected to backend")
})

app.post("/cart/add", (req, res) => {
    var id = req.body.item
    var product = art.prints.filter(print => print.id === id)
    res.send(product[0]);
})


app.post("/upload/gallery", (req, res) => {
    console.log(req.body);
    res.send("Item uploaded to gallery")
})

