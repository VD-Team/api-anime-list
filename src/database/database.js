const databaseInfo = require('./database.info')
const mysql = require('mysql')

const connection = mysql.createConnection( databaseInfo )
connection.end()

module.exports = connection
