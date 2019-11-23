require('dotenv').config()
const Client = require('bitcoin-core');
const express = require('express');
const app = express();
const cors = require('cors')
const socket = require('socket.io')

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
// app.use(cors({origin: '*'}))
// app.use(express.static(__dirname));

const server = app.listen(process.env.PORT || 3000, ()=>{
  console.log('jeboddy')
})


//Socket
const io = socket(server)

io.on('connection', socket => {
  console.log(socket.handshake.query)
  const username = socket.handshake.query.username
  connectUser(username, socket, smileyClient, socket.id)

  socket.on('requestDirections', data => {
    console.log(data)
    requestDirections(data.lat, data.long, data.username)
  })
  
  socket.on('disconnectUser', data => {
    console.log(data)
    disconnectUser(data.username)
  })  
  
  socket.on('error', (error)=>{
    console.error('Cought socket error', error)
  })

})

//Router
app.post('/notify', (req, res)=>{
  console.log('notifying!')
  console.log(req.query)
  return res.status(200);
});

