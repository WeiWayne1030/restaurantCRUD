const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('this is my rslist')
})

app.listen(port, () =>{
  console.log('Express is listening on http://localhost:3001')
})