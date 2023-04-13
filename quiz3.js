const express = require('express')
const app = express()
const port = 4000
const jwt = require('jsonwebtoken');

app.use(express.json())

app.post('/login', (req, res) => {
    console.log(req.body)
    
    let result = login(req.body.username, req.body.password)
    let token = generateToken(result)
    res.send(token)
})

app.get('/', (req, res) => {
  res.send('Hello UTeM!')
})

app.get('/bye', verifyToken, (req, res) => {
  res.send('Bye bye UTeM!')
})

app.post('/register', (req, res) => {
  let result = register(req.body.username, req.body.password, req.body.name, req.body.email)
  res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function login(reqUsername, reqPassword){
  let matchUser = dbUsers.find(user => user.username == reqUsername)
  if(!matchUser) return "User not found!"
  if(matchUser.password == reqPassword){
      return matchUser
  }
  else
  {
      return "Invalid password!"
  }
}
function register(reqUsername, reqPassword, reqName, reqEmail){
  dbUsers.push({
      username: reqUsername,
      password: reqPassword,
      name: reqName,
      email:reqEmail
})
}
function generateToken (userData){
  const token = jwt.sign( 
    userData,
    'benrs2',
    { expiresIn: 60 }
  );
  return token
}
function verifyToken(req, res, next) {
  let header = req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token,'benrs2', function(err,decoded){
    if(err){
      res.send("Invalid Token")
    }
    req.user = decoded
    next()
  });
}

let dbUsers = [
  {
      username: "Alif",
      password: "1234",
      name: "Alif",
      email: "Alif@utem.edu.my"
  },
  {
      username: "Azriana",
      password: "98765",
      name: "Azriana",
      email: "Azriana@gmail.com"
  },
  {
      username: "Haikal",
      password: "7890",
      name: "Haikal",
      email: "Haikal@gmail.com"
  }
]
