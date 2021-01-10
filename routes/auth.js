const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const auth = require("../middleware/auth")
const {body, validationResult} = require("express-validator");

const User = require("../models/user")

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user)
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error")
        
    }
})

router.post("/", [
    body("password", "password is required").exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {password, name} = req.body;
    try {
        let user = await User.findOne({name})
        if(!user) {
            return res.status(400).json({msg: "invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({msg: "invalid credentials"})
        }

        const payload = {
            user: {
                id: user.id,
            }
        }

        jwt.sign(
            payload,
            config.get("jwtSecret"),
            {expiresIn: 84600},
            (err, token) => {
                if (err) throw errors
                res.json({token})
            }
        )
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

module.exports = router