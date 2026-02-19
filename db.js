const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Orangepeels12!",
  database: "pharmacy_db"
});

module.exports = db;
