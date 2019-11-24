const { query } = require('./db');

async function getUser(username) {
  return await query('SELECT * FROM users WHERE username=$1', [username])
}

async function connectUserDb(username) {
  return await query('UPDATE users SET connected = true WHERE username=$1', [username])
}

async function createUserDb(username, address) {
  return await query('INSERT INTO users (username, address, connected) VALUES ($1, $2, true) RETURNING *', [username, address])
}

async function disconnectUserDb(username) {
  return await query('UPDATE users SET connected = false WHERE username = $1 RETURNING *', [username])
}

async function insertCurrentLocationDb(lat, long, username) {
  return await query('UPDATE users SET lat = $1, long = $2 WHERE username = $3', [lat, long, username])
}

async function getAddressForUserDb(username) {
  const result = await query('SELECT address FROM users WHERE username = $1', [username]);
  return result.rows[0].address
}

async function setDirectionsRequestedDb(username, bool){
  return await query('UPDATE users SET directionsrequested = $1 WHERE username = $2', [bool, username]);
}

async function getUserByAddressDb(address){
  const result = await query('SELECT * FROM users WHERE address = $1', [address]);
  return result
}

async function getTreasuresDb(){
  return await query('SELECT * FROM treasures');
}

async function setSocketIdForUserDb(username, socketId){
  return await query('UPDATE users SET socketid = $1 WHERE username = $2', [socketId, username])
}

module.exports = {
  getUser,
  connectUserDb,
  createUserDb,
  disconnectUserDb,
  insertCurrentLocationDb,
  getAddressForUserDb,
  setDirectionsRequestedDb,
  getUserByAddressDb,
  getTreasuresDb,
  setSocketIdForUserDb
}