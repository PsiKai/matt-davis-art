if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const express = require("express");
const connectDB = require("./db")
const expressStaticGzip = require("express-static-gzip");
const fileUpload = require("express-fileupload")
const path = require("path")
const secure = require("ssl-express-www");

const app = express();

app.use(secure)
app.use(express.json());
app.use(fileUpload())

connectDB();


app.use("/login", require("./routes/login"))
app.use("/register", require("./routes/users"))
app.use("/art", require("./routes/art"))
app.use("/cart", require("./routes/cart"))
app.use("/upload", require("./routes/upload"))
app.use("/update", require("./routes/update"))
app.use("/delete", require("./routes/delete"))
app.use("/contact", require("./routes/contact"))


if(process.env.NODE_ENV === 'production') {
    app.use(expressStaticGzip(path.join(__dirname, "client/build"), { maxAge: 86400000 }));

    app.get("*", (req, res) => {
        res.setHeader("Cache-Control", "max-age=3600")
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}


const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port " + port));
