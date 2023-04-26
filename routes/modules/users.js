const express = require('express')
const router = express.Router()
const User = require('../../models/user')

//登入用戶
router.get('/login', (req, res) =>{
  return res.render('login')
})


router.get('/register', (req, res) => {
  res.render('register')
})
module.exports = router