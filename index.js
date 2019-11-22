require('dotenv').config()
const Client = require('bitcoin-core');
const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http').Server(app)
const io = require('socket.io')(http)


//Smileycoin
const client = new Client({host: process.env.SMILEY_URL, port: process.env.SMILEY_PORT, username: process.env.SMILEY_USER, password: process.env.SMILEY_PASS})

//Express

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors({origin: '*'}))
app.use(express.static(__dirname));


//Socket
io.on('connection', function(data){
  console.log(data.handshake)
  connect()
})

io.on('error', (error)=>{
  console.error('Cought socket error', error)
})

function connect(){
  console.log('testing')
  client.getInfo().then((help) => console.log(help)).catch(e => console.error('error smiley', e));
}





const server = http.listen(process.env.PORT || 4000, ()=>{
  console.log('jeboddy')
})