const mysql = require('mysql');
const util = require('util');
const { mysqlConfig } = require('../config');
const pool = mysql.createPool(mysqlConfig);

pool.getConnection((err, connection) => {
  if (err) {
    console.log('connect error!!!');
  }
  console.log('connected!!!');
  return;
})

pool.query = util.promisify(pool.query);

module.exports = pool;