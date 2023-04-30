if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express")
const connectDB = require("./db")
const expressStaticGzip = require("express-static-gzip")
const fileUpload = require("express-fileupload")
const path = require("path")
const secure = require("ssl-express-www")

const app = express()

app.use(secure)
app.use(express.json())
app.use(fileUpload())

connectDB()

app.use("/api", require("./api/index"))

if (process.env.NODE_ENV === "production") {
  app.use(
    expressStaticGzip(path.join(__dirname, "client/build"), {
      maxAge: process.env.BROWSER_CACHE_DAYS * 24 * 60 * 60 * 1000,
    })
  )

  app.get("*", (req, res) => {
    res.setHeader("Cache-Control", "no-cache, max-age=0")
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log("Server started on port " + port))
