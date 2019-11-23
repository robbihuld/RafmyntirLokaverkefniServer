const {
  getUser,
  connectUserDb,
  createUserDb,
  disconnectUserDb,
  insertCurrentLocationDb
} = require('./database/dbFunctions.js')

let io;
let smileyClient

async function connectUser(username, myIo, mySmileyClient){
  const user = await getUser(username);
  io = myIo
  smileyClient = mySmileyClient

  if(user.rowCount === 0){
    console.log('create user')
    createUser(username)
  } else if(user.rows[0].connected) {
    io.emit('userConnected')
    return
  } else {
    //connect user
    await connectUserDb(username);
  }

  console.log('about to login')
  myIo.emit('login')
}

async function requestDirections(lat, long, username){
  await insertCurrentLocationDb(lat, long, username)
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