const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "sql3.freesqldatabase.com",
    user: "sql3790746",
    password: "iyGcIDsWiF",
    port: 3306,
    database: "sql3790746"
})

module.exports = pool;