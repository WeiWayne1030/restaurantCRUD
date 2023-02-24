const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')

const routes = require('./routes')

const app = express()
const port = 3001

//設定靜態資料
app.use(express.static('public'))
//每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))


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

//設定routes
app.use(routes)

//新增搜尋功能
app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase();
  if (!keyword || !keyword.length) {
    res.redirect("/");
  }
  Restaurant.find({})
    .lean()
    .then((restaurants) => {
      const filteredList = restaurants.filter(
        (restaurant) =>
          restaurant.name_en.toLowerCase().includes(keyword) ||
          restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.category.toLowerCase().includes(keyword)
      );
      res.render("index", { restaurants: filteredList, keyword });
    });
});


app.listen(port, () =>{
  console.log('Express is listening on http://localhost:3001')
})