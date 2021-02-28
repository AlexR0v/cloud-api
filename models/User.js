const {Schema, model} = require('mongoose')

const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  user_information: String,
  avatar: String
})

module.exports = model('User', User)
