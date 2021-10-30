const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        res.status(401).json({msg: "no token, authorization denied"})
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: "token is not valid"})
    }
}