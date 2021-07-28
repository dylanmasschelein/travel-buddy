const express = require("express");
const router = express.Router();
const User = require("../models/users.ts");
const Blog = require("../models/blogs.ts");

router
  // Get all posts by related user
  .get("/", (req, res) => {
    Blog.fetchAll({ withRelated: ["users"] })
      .then((posts) => {
        res.status(200).json(posts);
      })
      .catch(() => res.status(400).json({ message: "Error getting posts" }));
  })

  //Get blog post by id
  .get("/:id", (req, res) => {
    Blog.where({ id: req.params.id })
      .fetch({ withRelated: ["users"] })
      .then((post) => {
        res.status(200).json({ post });
      })
      .catch(() => {
        res
          .status(404)
          .json({ message: `Error getting post ${req.params.id}` });
      });
  })

  // Create new post
  .post("/", (req, res) => {
    User.where({ id: req.body.user_id })
      .fetch()
      .then(
        (user) => {
          return user; // -> pass user object to next .then() method
        },
        () => {
          res.status(404).json({ message: "Not a valid user id" });
        }
      )
      .then((user) => {
        new Blog({
          title: req.body.title,
          body: req.body.content,
          user_id: user.id,
        })
          .save()
          .then((newPost) => {
            res.status(201).json(newPost);
          });
      })
      .catch(() => res.status(404).json({ message: "Error creating post" }));
  })

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
