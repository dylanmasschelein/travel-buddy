const express = require("express");
const app = express();
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mass1992",
  database: "travelbuddy",
});

// Connect to DB
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected");
});

// Create Database
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE travelbuddy";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Database Created");
  });
});

require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// Create Table
app.get("/createuser", (req, res) => {
  let sql =
    "CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), desgination VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("User table created!");
  });
});

// Insert User
app.get("/employee1", (req, res) => {
  let post = { name: "Dylan Masschelein", occupation: "CEO" };
  let sql = "INSERT INTO users SET ?";
  let query = db.query(sql, post, (err) => {
    if (err) {
      throw err;
    }
    res.send("Employee Added");
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
