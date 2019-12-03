require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const socket = require('socket.io')

const {
  connectUser,
  disconnectUser,
  requestDirections,
  paymentRecieved,
  dig
} = require('./handler')


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
  console.log('socketId: ', socket.id)
  const username = socket.handshake.query.username
  connectUser(username, socket, io, socket.id)

  socket.on('requestDirections', data => {
    console.log(data)
    requestDirections(data.lat, data.long, data.username)
  })
  
  socket.on('dig', data => {
    dig(data.lat, data.long, data.username)
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
app.post('/notify', async (req, res) =>{
  console.log('notifying!')
  paymentRecieved(req.body.txid);
  res.sendStatus(200);
});

