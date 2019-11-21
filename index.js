require('dotenv').config()
const Client = require('bitcoin-core');
const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http').Server(app)
const io = require('socket.io')(http)


//Smileycoin
const client = new Client({host: '192.168.1.109', port: '22001', username: 'robert', password: 'roberterbestur'})

//Express

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors({origin: '*'}))
app.use(express.static(__dirname));


//Socket
io.on('connection', function(){
  console.log()
  console.log('Socket connection')
})

io.on('connect', ()=>{
  console.log('Asdf')
})

client.getInfo().then((help) => console.log(help)).catch(e => console.error(e));


const server = http.listen(process.env.PORT || 4000, ()=>{
  console.log('jeboddy')
})