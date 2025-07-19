const mysql = require('mysql2');

// Nota: Normalmente se usan variabes de entorno para no exponer las credenciales de acceso en el fichero .env
// sin embargo estas son credenciales de una BD que se creo especificamente para hacer estas prueba
const pool = mysql.createPool({
    host: "sql3.freesqldatabase.com",
    user: "sql3790746",
    password: "iyGcIDsWiF",
    port: 3306,
    database: "sql3790746"
})

module.exports = pool;