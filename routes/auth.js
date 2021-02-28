const express = require('express')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')

const router = express.Router()

const validation = [
  check('email', 'Incorrect email').isEmail(),
  check(
    'password',
    'Password must be longer than 3 and shorter than 12 characters')
    .isLength({ min: 3, max: 12 }
    )
]

router.post('/', validation, async (req, res) => {
  try {
    const errors = validationResult(req)
    const errorFormatter = Object.values(errors.mapped()).find(err => err.msg)

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errorFormatter.msg })
    }

    const { name, email, password, avatar } = req.body
    const candidateEmail = await User.findOne({ email })

    if (candidateEmail) {
      return res.status(400).json({ success: false, message: `User with email ${email} already exist` })
    }

    const candidateName = await User.findOne({ name })

    if (candidateName) {
      return res.status(400).json({ success: false, message: `User with name ${name} already exist` })
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const user = new User({ name, email, password: hashPassword, avatar })
    await user.save()

    return res.status(200).json({ success: true, message: 'User was created' })
  } catch (e) {
    res.status(400).json({ success: false, message: 'Server error' })
  }
})

module.exports = router
