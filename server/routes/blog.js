const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Blog = require("../models/blogs.js");

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
    console.log(req.params.id);
    Blog.where({ user_id: req.params.id })
      .fetch()
      .then((post) => {
        console.log(post);
        res.status(200).json({ post });
      })
      .catch(() => {
        console.log("catching");
        res
          .status(404)
          .json({ message: `Error getting post ${req.params.id}` });
      });
  })

  // Create new post
  .post("/", async (req, res) => {
    console.log(req.body);
    console.log("inside");
    console.log(Blog);
    const { user_id, title, body } = req.body;
    try {
      const post = await new Blog({
        user_id,
        title,
        body,
      });
      await post.save();
      res.status(200).json({ message: "Blog post created!" });
    } catch (err) {
      console.error(err);
    }
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
