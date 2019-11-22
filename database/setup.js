require('dotenv').config();

const fs = require('fs');
const util = require('util');

const { query } = require('./db');

const readFileAsync = util.promisify(fs.readFile);


async function main() {
  await query('DROP TABLE IF EXISTS users');
  await query('DROP TABLE IF EXISTS treasures');

  try {
    console.info('Creating tables');
    const tables = await readFileAsync('./database/tables.sql');

    await query(tables.toString('utf8'));
    console.info('Tables created');
  } catch (e) {
    console.error('Error creating tables', e);
    return;
  }

  try {
    console.info('Inserting data');
    const insert = await readFileAsync('./database/insert.sql');

    await query(insert.toString('utf8'));
    console.info('Data inserted');
  } catch (e){
    console.error('Error inserting data', e);
    return;
  }
}

main().catch((err)=>{
  console.error(err);
})