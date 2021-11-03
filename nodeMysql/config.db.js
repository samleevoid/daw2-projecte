const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql");

let connection;

try {
  connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
  });
} catch (error) {
  console.log("Error al connectar amb la base de dades");
}

module.exports = { connection };
