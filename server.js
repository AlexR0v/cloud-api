const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
dotenv.config({ path: './config/config.env' })

const PORT = process.env.PORT ?? 4000

const app = express()

const auth = require('./routes/auth')
const users = require('./routes/users')

app.use(express.json())
app.use('/api/v1/registration', auth)
app.use('/api/v1/users/get', users)
app.use('/api/v1/user', users)
app.use('/api/v1/user', users)

const start = async ()=>{
  try {
    await connectDB()
    await app.listen(PORT, ()=>{
      console.log(`Server started on port ${PORT}`)
    })
  } catch (e){
    console.log(e)
  }
}
start()



