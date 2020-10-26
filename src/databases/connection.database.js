const mysql = require('mysql');
const configDatabase = require('../databases/config.database');

const connection = mysql.createConnection(configDatabase);

connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database MySQL.');
});

module.exports = connection;