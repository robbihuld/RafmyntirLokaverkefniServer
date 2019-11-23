require('dotenv').config()
const Client = require('bitcoin-core');
const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http').Server(app)
const io = require('socket.io')(http)

const {
  connectUser,
  disconnectUser,
  requestDirections
} = require('./handler')

//Smileycoin
const smileyClient = new Client({host: process.env.SMILEY_URL, port: process.env.SMILEY_PORT, username: process.env.SMILEY_USER, password: process.env.SMILEY_PASS})

//Express

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors({origin: '*'}))
app.use(express.static(__dirname));


//Socket
io.on('connection', data => {
  console.log(data.handshake.query)
  const username = data.handshake.query.username
  connectUser(username, io, smileyClient)
})

io.on('requestDirections', data => {
  console.log(data)
  requestDirections(data.lat, data.long, data.username)
})

io.on('disconnectUser', data => {
  disconnectUser(data.username)
})  

io.on('error', (error)=>{
  console.error('Cought socket error', error)
})






const server = http.listen(process.env.PORT || 3000, ()=>{
  console.log('jeboddy')
})