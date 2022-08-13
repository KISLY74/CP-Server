require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const router = require('./routes/index')

app.use(express.json())
app.use(cors())
app.use('/api', router)

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(PORT, () => {
      console.log(`server started on PORT ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}
start()