const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3001



//設定靜態資料
app.use(express.static('public'))
//每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')



// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
//設定routes
app.use(routes)




app.listen(port, () =>{
  console.log('Express is listening on http://localhost:3001')
})