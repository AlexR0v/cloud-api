const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    if(!users){
      return res.status(400).json({ success: false, message: 'Not found any users' })
    }
    users.forEach(user => user.password = '****')
    return res.status(200).json({ success: true, data: users })
  } catch (e) {
    res.status(400).json({ success: false, message: 'Server error' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user){
      return res.status(400).json({ success: false, message: 'User not found' })
    }
    user.password = '*****'
    return res.status(200).json({ success: true, data: user })
  } catch (e) {
    res.status(400).json({ success: false, message: 'Server error' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if(!user){
      return res.status(400).json({ success: false, message: 'User not found' })
    }
    user.password = '*****'
    return res.status(200).json({ success: true, data: user, message: 'User was updated' })
  } catch (e) {
    res.status(400).json({ success: false, message: 'Server error' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user){
      return res.status(400).json({ success: false, message: 'User not found' })
    }
    const users = await User.find()
    users.forEach(user => user.password = '****')
    return res.status(200).json({ success: true, message: 'User was deleted', data: users })
  } catch (e) {
    res.status(400).json({ success: false, message: 'Server error' })
  }
})

module.exports = router
