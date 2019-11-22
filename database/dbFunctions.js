const {query} = require('./db');

async function getUser(username){
  return await query('SELECT * FROM users WHERE username=$1', [username])
}

module.exports = {
  getUser
}