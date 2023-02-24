const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3001

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error')
})

db.once('open', () =>{
  console.log('mongoDB connected!')
})


app.get('/', (req, res) => {
  res.send('this is my rslist')
})

app.listen(port, () =>{
  console.log('Express is listening on http://localhost:3001')
})