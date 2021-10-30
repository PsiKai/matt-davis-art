const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET
const path = require('path')
const express = require("express")
const app = express()
const expressStaticGzip = require('express-static-gzip')

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        if(process.env.NODE_ENV === 'production') {
            app.use(expressStaticGzip(path.join(__dirname, "client/build")));
            return res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
        } 
        return res.status(401).json({msg: "no token, authorization denied"})
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: "token is not valid"})
    }
}