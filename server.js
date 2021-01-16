if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const express = require("express");
const connectDB = require("./db")
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload")
const path = require("path")

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())

connectDB();


app.use("/login", require("./routes/login"))
app.use("/register", require("./routes/users"))
app.use("/art", require("./routes/art"))
app.use("/cart", require("./routes/cart"))
app.use("/upload", require("./routes/upload"))
app.use("/update", require("./routes/update"))
app.use("/delete", require("./routes/delete"))


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "client/build")));

    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")))
}


const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port " + port));