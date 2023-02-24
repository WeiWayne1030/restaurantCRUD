const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//新增一筆資料
router.get('/new', (req, res) =>{
  return res.render('new')
})

router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//預覽特定餐廳
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', {restaurant}))
    .catch(err => console.log(err))
})

//修改特定餐廳
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) =>{
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(()=> res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

//刪除特定餐廳
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => { restaurant.remove() })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router