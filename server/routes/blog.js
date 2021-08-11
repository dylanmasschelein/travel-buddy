const express = require("express");
const router = express.Router();
const Blog = require("../models/blogs");
const Location = require("../models/locations");
const knex = require("knex")(require("../utils/knexfile"));

router

  .get("/:locationid", (req, res) => {
    const locationId = Number(req.params.locationid);
    knex
      .where({ location_id: locationId })
      .select("*")
      .from("blogs")
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.send("Error getting blogs for this location"));
  })

  .get("/active/:id", (req, res) => {
    console.log(req.params.id);
    knex("blogs")
      .where({ id: Number(req.params.id) })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.send("Error getting blog post"));
  })

  .get("/", (req, res) => {
    knex
      .select("*")
      .from("blogs")
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.send("Error getting all blogs"));
  })

  // Create new post
  .post("/", (req, res) => {
    const { location_id, title, body } = req.body;
    Location.where({ id: location_id })
      .fetch()
      .then(
        (location) => {
          return location;
        },
        () => {
          res.status(404).json({ message: "Not a valid user id" });
        }
      )
      .then((location) => {
        new Blog({
          title,
          body,
          location_id: location.id,
        })
          .save()
          .then((newPost) => {
            res.status(201).json(newPost);
          });
      })
      .catch(() =>
        res.status(404).json({ message: "Error creating blog post" })
      );
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
        res.status(404).json({ message: "Error updating blog post" });
      });
  })

  // Delete post
  .delete("/:id", (req, res) => {
    Blog.where({ id: req.params.id })
      .destroy()
      .then(() => {
        res
          .status(200)
          .json({ message: `Blog post with id: ${req.params.id} deleted` });
      })
      .catch(() =>
        res.status(400).json({
          message: `Error deleting blog post with id: ${req.params.id}`,
        })
      );
  });

module.exports = router;
