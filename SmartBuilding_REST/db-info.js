const sql = require('mssql');

module.exports = sql.connect({
    database: process.env.DB_NAME,
  server: 'localhost',
});