const express = require("express");
const router = express.Router();
const User = require("../models/users.ts");
const Blog = require("../models/blogs.ts");
// use the "delete keywaord to alter whats recieved in get reqs!"

router
  //Get single user by id
  .get("/:email", (req, res) => {
    //send through password in body for verification later
    User.where({ email: req.params.email })
      .fetch()
      .then((user) => {
        delete user.attributes["created_at"];
        delete user.attributes["password"];
        res.status(200).json(user);
      })
      .catch(() => {
        res
          .status(400)
          .json({ message: `Error getting user ${req.params.email}` });
      });
  })

  // Get a single uses via their blog post?

  // Register a user
  .post("/", (req, res) => {
    const { name, email, password } = req.body;
    new User({
      name,
      email,
      password,
    })
      .save()
      .then((user) => {
        console.log(user);
        res.status(200).json(user);
      })
      .catch(() => {
        res.status(400).json({ message: "Error creating user" });
      });
  })

  //update a user
  .put("/:id", (req, res) => {
    User.where({ id: req.params.id })
      .fetch()
      .then((user) => {
        user
          .save({
            name: req.body.name, // dynamically update only the target field??/
          })
          .then((user) => {
            res.status(200).json(user);
          });
      })
      .catch(() =>
        res
          .status(400)
          .json({ message: `Error updating user ${req.params.id}` })
      );
  })
  // delete account
  .delete("/:id", (req, res) => {
    User.where({ id: req.params.id })
      .destroy()
      .then(() => {
        res.status(200).json({ message: `User ${req.params.id} deleted` });
      })
      .catch(() =>
        res
          .status(400)
          .json({ message: `Error deleting user ${req.params.id}` })
      );
  });

module.exports = router;
