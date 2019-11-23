const {
  getUser,
  connectUserDb
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
  } else {
    //connect user
    await connectUserDb(username);
  }
}

async function createUser(username){
  const address = smileyClient.getNewAddress('base')
  console.log(address)
  await createUserDb(username, address)
}

module.exports = {
  connectUser
}