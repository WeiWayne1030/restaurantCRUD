const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')

const app = express()
const port = 3001

//設定靜態資料
app.use(express.static('public'))

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

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

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//預覽全部資料
app.get('/', (req, res) =>{
  return Restaurant.find({})
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//新增一筆資料
app.get('/restaurants/new', (req, res) =>{
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () =>{
  console.log('Express is listening on http://localhost:3001')
})