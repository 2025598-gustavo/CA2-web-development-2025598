const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "dublin_dog_walkers"
});

db.connect((error) => {
  if (error) {
    console.error("Database connection failed:", error);
    return;
  }

  console.log("Connected to MySQL database");
});

module.exports = db;