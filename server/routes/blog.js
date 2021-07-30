const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Blog = require("../models/blogs.js");
const knex = require("knex")(require("../utils/knexfile"));

router

  .get("/:id", (req, res) => {
    knex
      .where({ user_id: 1 })
      .select("*")
      .from("blogs")
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => res.send("Error getting warehouses data"));
  })

  .get("/", (req, res) => {
    knex
      .select("*")
      .from("blogs")
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => res.send("Error getting warehouses data"));
  })

  // Create new post

  .post("/", (req, res) => {
    const { user_id, title, body } = req.body;
    console.log(req.body);
    User.where({ id: user_id })
      .fetch()
      .then(
        (user) => {
          return user;
        },
        () => {
          res.status(404).json({ message: "Not a valid user id" });
        }
      )
      .then((user) => {
        new Blog({
          title,
          body,
          user_id: user.id,
        })
          .save()
          .then((newPost) => {
            res.status(201).json(newPost);
          });
      })
      .catch(() => res.status(404).json({ message: "Error creating post" }));
  })
  // .post("/", async (req, res) => {
  //   const { user_id, title, body } = req.body;
  //   try {
  //     const post = await new Blog({
  //       title,
  //       body,
  //       user_id,
  //     });
  //     console.log(post);
  //     await post.save();

  //     res.status(200).json({ message: "Blog post created!" });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // })
  // Update post
  .put("/:id", (req, res) => {
    Blog.where({ id: req.params.id })
      .fetch()
      .then((post) => {
        post
          .save({
            title: req.body.title,
            body: req.body.content,
            user_id: post.user_id,
          })
          .then((updatedPost) => {
            res.status(200).json(updatedPost);
          });
      })
      .catch(() => {
        res.status(404).json({ message: "Error updating post" });
      });
  })

  // Delete post
  .delete("/:id", (req, res) => {
    Blog.where({ id: req.params.id })
      .destroy()
      .then(() => {
        res.status(200).json({ message: `Post ${req.params.id} deleted` });
      })
      .catch(() =>
        res
          .status(400)
          .json({ message: `Error deleting post ${req.params.id}` })
      );
  });

module.exports = router;
