const express = require('express')
const app = express()
const port = 4000

app.use(express.json())

app.post('/login', (req, res) => {
    console.log(req.body)
    req.send('Login')
  })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/bye', (req, res) => {
    res.send('Bye Bye utem')
  })


  app.post('/register', (req, res) => {
    res.send('please register')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})