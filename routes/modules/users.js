const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

//登入
router.get('/login', (req, res) =>{
  return res.render('login')
})

router.post('login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  //輸入參數
  const {name, email, password, confirmPassword } = req.body
  //檢查是否註冊
  User.findOne({ email }).then(user => {
    //重新導向登入頁
    if(user) {
      console.log('User already exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      // 如果沒註冊，寫入資料庫
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
})

module.exports = router