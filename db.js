// Import MySQL library
const mysql = require("mysql2");

// Create the connection with MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "dublin_dog_walkers"
});

// Test database connection
db.connect((error) => {
  if (error) {
    console.error("Database connection failed:", error);
    return;
  }

  console.log("Connected to MySQL database");
});

// Export database connection to be used in server.js
module.exports = db;