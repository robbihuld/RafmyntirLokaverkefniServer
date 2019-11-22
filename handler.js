const {
  getUser
} = require('./database/dbFunctions.js')

async function connectUser(username){
  const user = await getUser(username);
  console.log(user);
}

module.exports = {
  connectUser
}