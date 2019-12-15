const geolib = require('geolib')
const Client = require('bitcoin-core');

const {
  getUser,
  connectUserDb,
  createUserDb,
  disconnectUserDb,
  insertCurrentLocationDb,
  getAddressForUserDb,
  setDirectionsRequestedDb,
  getUserByAddressDb,
  getTreasuresDb,
  setFoundTreasureDb
} = require('./database/dbFunctions.js')

const smileyClient = new Client({ host: process.env.SMILEY_URL, port: process.env.SMILEY_PORT, username: process.env.SMILEY_USER, password: process.env.SMILEY_PASS })

let socket;
let io;
async function connectUser(username, mySocket, myIo, socketId) {
  const user = await getUser(username);
  socket = mySocket
  io = myIo

  if (user.rowCount === 0) {
    console.log('create user')
    createUser(username, socketId)
  } else if (user.rows[0].connected) {
    socket.emit('userConnected')
    return
  } else {
    //connect user
    await connectUserDb(username, socketId);
  }

  console.log('about to login')
  socket.emit('login')
}

async function requestDirections(lat, long, username) {
  await insertCurrentLocationDb(lat, long, username)
  await setDirectionsRequestedDb(username, true)

  const address = await getAddressForUserDb(username)
  socket.emit('sendToAddress', {
    address: address,
    amount: 10
  })
}

async function createUser(username, socketId) {
  console.log('her')
  const address = await smileyClient.getNewAddress('base')
  console.log(address)
  console.log('after address')
  const result = await createUserDb(username, address, socketId)
  console.log(result)
  console.log('after result')
}

async function disconnectUser(username) {
  await disconnectUserDb(username);
}

async function paymentRecieved(txid) {
  const transaction = await smileyClient.getTransaction(txid)
  const amount = transaction.amount
  const address = transaction.details[0].address

  if (amount === 10) {
    const result = await getUserByAddressDb(address)
    if (result.rowCount === 0) { return; } //no user with this address
    const user = result.rows[0]
    if (!user.directionsrequested) { return; } //the user did not request directions

    await setDirectionsRequestedDb(user.username, false)

    //Find nearest treasure
    const treasures = await getTreasuresDb()
    const nearest = geolib.findNearest({ latitude: user.lat, longitude: user.long }, treasures.rows)
    console.log(nearest)
    //Send user the general direction of treasure
    const direction = geolib.getCompassDirection(
      { latitude: user.lat, longitude: user.long },
      { latitude: nearest.latitude, longitude: nearest.longitude }
    )

    let distance = geolib.getDistance(
      {latitude: user.lat, longitude: user.long},
      {latitude: nearest.latitude, longitude: nearest.longitude},
      0.1
    )

    distance = Math.round(distance / 10) * 10

    io.to(`${user.socketid}`).emit('directionToNearest', { direction: direction, distance: distance })

  }
}

async function dig(lat, long, username){
  const treasures = await getTreasuresDb()
  const nearest = geolib.findNearest({latitude: lat, longitude: long}, treasures.rows)

  const dist = geolib.getDistance(
    { latitude: lat, longitude: long},
    { latitude: nearest.latitude, longitude: nearest.longitude},
    0.1
  )

  if(dist < 10){
    await setFoundTreasureDb(nearest.id)
    socket.emit('found', nearest)
  } else {
    socket.emit('notFound')
  }
}

async function payUser(address, amount){
  await smileyClient.sendToAddress(address, amount, 'SmileyTreasure')
}

module.exports = {
  connectUser,
  disconnectUser,
  requestDirections,
  paymentRecieved,
  dig,
  payUser
}