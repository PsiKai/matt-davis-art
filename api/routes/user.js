const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET
const auth = require("../../middleware/auth")

const User = require("../../models/user")

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).select("-password")
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Error getting users" })
  }
})

router.post("/", async (req, res) => {
  res.status(405).json({ msg: "You can't create a user here" })
  //   const { name, password } = req.body
  //   user = new User({ name, password })

  //   try {
  //     const salt = await bcrypt.genSalt(10)
  //     user.password = await bcrypt.hash(password, salt)
  //     await user.save()

  //     const payload = { user: { id: user.id } }
  //     const token = await jwt.sign(payload, jwtSecret, { expiresIn: 84600 })

  //     res.status(201).json({ token })
  //   } catch (error) {
  //     console.error(error)
  //     res.status(500).json({ msg: "Error creating user" })
  //   }
})

router.get("/login", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Error authenticating user" })
  }
})

router.post("/login", async (req, res) => {
  const name = process.env.USER_NAME
  const { password } = req.body
  try {
    let user = await User.findOne({ name })

    if (!user) return res.status(400).json({ msg: "Invalid login credentials" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: "Invalid login credentials" })

    const payload = { user: { id: user.id } }
    const token = await jwt.sign(payload, jwtSecret, { expiresIn: 84600 })
    user = user.toObject()
    delete user.password

    res.json({ token, user })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: "There was a server error" })
  }
})

router.patch("/:_id", auth, async (req, res) => {
  const { name, password } = req.body
  const { _id } = req.params
  if (_id !== req.user.id) {
    return res.status(401).json({ msg: "Not authorized" })
  }
  try {
    const user = await User.findById(_id)
    if (password) {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
    }
    user.name = name || user.name
    await user.save()

    res.status(200).json({ msg: "User updated", name })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Error updating user" })
  }
})

module.exports = router
