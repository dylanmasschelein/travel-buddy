const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");
const knex = require("knex")(require("../utils/knexfile"));
const Location = require("../models/locations");

router
  .get("/active/:blog", (req, res) => {
    const blogId = Number(req.params.blog);
    knex
      .where({ blog_id: blogId })
      .select("*")
      .from("comments")
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => res.send("Error getting comment data"));
  })
  // .get("/:adventureid", (req, res) => {
  //   const adventureId = Number(req.params.adventureid);
  //   knex
  //     .where({ adventure_id: adventureId })
  //     .select("*")
  //     .from("location")
  //     .then((data) => {
  //       console.log(data);
  //       res.json(data);
  //     })
  //     .catch((err) => res.send("Error getting location data"));
  // })

  // Create new post

  .post("/", (req, res) => {
    const { comment, user_id, blog_post_id } = req.body;

    Blog.where({ id: Number(blog_post_id) })
      .fetch()
      .then(
        (blog) => {
          return blog;
        },
        () => {
          res.status(404).json({ message: "Not a valid blog id" });
        }
      )
      .then((blog) => {
        new Comment({
          comment,
          user_id,
          blog_post_id: blog.id,
        })
          .save()
          .then((newComment) => {
            res.status(201).json(newComment);
          });
      })
      .catch(() => res.status(404).json({ message: "Error adding location" }));
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
