const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get("/", (req, res) => {
  const userId = res.locals.user._id;
  const userName = res.locals.user.name || res.locals.user.email.split('@', 1);
  Restaurant
    .find({ userId })
    .lean()
    .sort({ _id: "asc" })
    .then((restaurants) => res.render("index", { restaurants, userName }));
})

//新增搜尋功能
router.get("/search", (req, res) => {
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

//新增dropdown功能


module.exports = router