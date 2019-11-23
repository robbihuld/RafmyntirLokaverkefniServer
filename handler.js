const {
  getUser,
  connectUserDb,
  createUserDb,
  disconnectUserDb,
  insertCurrentLocationDb,
  getAddressForUserDb
} = require('./database/dbFunctions.js')

let socket;
let smileyClient

async function connectUser(username, mySocket, mySmileyClient){
  const user = await getUser(username);
  socket = mySocket
  smileyClient = mySmileyClient

  if(user.rowCount === 0){
    console.log('create user')
    createUser(username)
  } else if(user.rows[0].connected) {
    socket.emit('userConnected')
    return
  } else {
    //connect user
    await connectUserDb(username);
  }

  console.log('about to login')
  socket.emit('login')
}

async function requestDirections(lat, long, username){
  await insertCurrentLocationDb(lat, long, username)
  const address = await getAddressForUserDb(username)
  socket.emit('sendToAddress', {
    address: address,
    amount: 10
  })
}

async function createUser(username){
  const address =  await smileyClient.getNewAddress('base')
  console.log(address)
  await createUserDb(username, address)
}

async function disconnectUser(username){
  await disconnectUserDb(username);
}

module.exports = {
  connectUser,
  disconnectUser,
  requestDirections
}