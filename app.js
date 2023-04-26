const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
const PORT = process.env.PORT

//要在載入session之後
const usePassport = require('./config/passport')
require('./config/mongoose')


const app = express()
const port = 3001



//設定靜態資料
app.use(express.static('public'))
//每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//session套件
app.use(session({
  secret: process.env.mySecret,
  resave: false,
  saveUninitialized: true
}))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//呼叫passport，傳入app
usePassport(app)
app.use(flash())
//middleware(放進locals)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

//設定routes
app.use(routes)




app.listen(port, () =>{
  console.log(`Express is listening on http://localhost:${PORT}`)
})