const {query} = require('./db');

async function getUser(username){
  return await query('SELECT * FROM users WHERE username=$1', [username])
}

async function connectUserDb(username){
  return await query('UPDATE users SET connected = true WHERE username=$1', [username])
}

async function createUserDb(username, address){
  return await query('INSERT INTO users (username, address) VALUES ($1, $2) RETURNING *', [username, address])
}

module.exports = {
  getUser,
  connectUserDb,
  createUserDb
}