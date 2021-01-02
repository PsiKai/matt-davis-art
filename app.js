if (process.env.NODE_ENV === 'production') {
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

let cart = [];

app.post("/cart/add", (req, res) => {
    var id = req.body.item
    var product = art.prints.filter(print => print.id === id)
    console.log(product[0].price);
    cart.push(product[0])
    console.log(cart);
    res.send(product[0]);
})

