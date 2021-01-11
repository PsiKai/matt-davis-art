const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

const User = require("../models/user")

router.post("/", async (req, res) => {
    const {name, password} = req.body;
    
    user = new User({
        name,
        password
    })

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt)

    await user.save();

    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(
        payload,
        jwtSecret,
        {expiresIn: 84600},
        (err, token) => {
            if (err) throw errors;
            res.json({token})
        }
    )
})

module.exports = router;