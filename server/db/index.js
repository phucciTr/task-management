const mysql = require('mysql');
const Promise = require('bluebird');
const createTables = require('./schema');
const database = 'task_management';


const connection = mysql.createConnection({
  user: 'root',
  password: ''
});

const db = Promise.promisifyAll((connection));

db.connectAsync()
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => console.log(`CONNECTED TO ${database} DATABASE`))
  .then(() => createTables(db))
  .catch((err) => console.log('db.connectAsync ERR = ', err));

module.exports = db;