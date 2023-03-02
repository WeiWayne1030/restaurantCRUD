const express = require('express')
const router = express.Router()
const User = require('../../models/user')

//登入用戶
router.get('/', (req, res) =>{
  return res.render('user')
})

router.post("/", (req, res) => {
  const { email, password, loginCheck } = req.body;
  //驗證身分
  let user = User.find(
    (user) => user.email === email && user.password === password
  );
  //登入成功
  if (user) {
    console.log(loginCheck);
    if (loginCheck) {
      req.session.email = user.email;
      req.session.password = user.password;
      req.session.firstName = user.firstName;
    }
    res.render("login", { user });
  } else {
    //失敗回首頁
    const incorrect = "incorrect";
    res.render("index", { incorrect });
  }
});

// 登出 (使用session delete 或是 req.session.destroy() )
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
})

module.exports = router