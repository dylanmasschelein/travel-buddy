const express = require("express");
const app = express();
const userRoutes = require("./routes/user.js");
const blogRoutes = require("./routes/blog.js");
const adventureRoutes = require("./routes/adventures.js");
const locationRoutes = require("./routes/locations.js");

require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log("im in the server!");

app.use("/locations", locationRoutes);
app.use("/adventures", adventureRoutes);
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Mass1992",
//   database: "travelbuddy",
// });

// // Connect to DB
// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("MySQL Connected");
// });

// // Create Database
// app.get("/createdb", (req, res) => {
//   let sql = "CREATE DATABASE travelbuddy";
//   db.query(sql, (err) => {
//     if (err) {
//       throw err;
//     }
//     res.send("Database Created");
//   });
// });

// // Insert User
// app.post("/user", (req, res) => {
//   const { name, email, password } = req.body;
//   let post = { name, email, password };
//   let sql = "INSERT INTO users SET ?";
//   let query = db.query(sql, post, (err) => {
//     if (err) {
//       throw err;
//     }
//     res.send("user Added");
//   });
// });

// // Get user
// app.get("/user/login", (req, res) => {
//   const { email, password } = req.body;
//   // Middleware for confirming hashed password
//   let sql = `SELECT FROM users WHERE email=${email} `;
//   let query = db.query(sql, (err) => {
//     if (err) {
//       throw err;
//     }
//     res.send("user found");
//   });
// });

// // Insert Blog post
// app.post("/blog", (req, res) => {
//   const { title, published, user, article, likes } = req.body;
//   let post = { title, published, user, article, likes };
//   let sql = "INSERT INTO users SET ?";
//   let query = db.query(sql, post, (err) => {
//     if (err) {
//       throw err;
//     }
//     res.send("blog Added");
//   });
// });

// // Insert Blog post
// app.post("/blog/comment", (req, res) => {
//   const { id, user, published, comment, likes } = req.body;
//   let post = { id, published, user, comment, likes };
//   let sql = "INSERT INTO users SET ?";
//   let query = db.query(sql, post, (err) => {
//     if (err) {
//       throw err;
//     }
//     res.send("comment Added");
//   });
// });

// // Create Table
// app.get("/createuser", (_req, res) => {
//   let sql =
//     "CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), created_at TIMESTAMP, PRIMARY KEY(id))";
//   db.query(sql, (err) => {
//     if (err) {
//       throw err;
//     }
//     res.send("User table created!");
//   });
// });
