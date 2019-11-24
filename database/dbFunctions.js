const { query } = require('./db');

async function getUser(username) {
  return await query('SELECT * FROM users WHERE username=$1', [username])
}

async function connectUserDb(username, socketId) {
  return await query('UPDATE users SET connected = true, socketid = $1 WHERE username=$2', [socketId, username])
}

async function createUserDb(username, address, socketId) {
  return await query('INSERT INTO users (username, address, connected, socketid) VALUES ($1, $2, true, $3) RETURNING *', [username, address, socketId])
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

module.exports = {
  getUser,
  connectUserDb,
  createUserDb,
  disconnectUserDb,
  insertCurrentLocationDb,
  getAddressForUserDb,
  setDirectionsRequestedDb
}