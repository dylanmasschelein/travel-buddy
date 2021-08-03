const express = require("express");
const router = express.Router();
const Adventure = require("../models/adventures.js");
const knex = require("knex")(require("../utils/knexfile"));
const Location = require("../models/locations");

router
  .get("/active/:locationid", (req, res) => {
    const locationId = Number(req.params.locationid);
    knex
      .where({ id: locationId })
      .select("*")
      .from("location")
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => res.send("Error getting location data"));
  })
  .get("/:adventureid", (req, res) => {
    const adventureId = Number(req.params.adventureid);
    knex
      .where({ adventure_id: adventureId })
      .select("*")
      .from("location")
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => res.send("Error getting location data"));
  })

  // Create new post

  .post("/", (req, res) => {
    const {
      coords,
      city,
      province,
      abbrv_province,
      country,
      full_address,
      place_id,
    } = req.body;
    Adventure.where({ id: 1 })
      .fetch()
      .then(
        (adventure) => {
          return adventure;
        },
        () => {
          res.status(404).json({ message: "Not a valid adventure id" });
        }
      )
      .then((adventure) => {
        new Location({
          city,
          coords,
          adventure_id: adventure.id,
          province,
          abbrv_province,
          country,
          full_address,
          place_id,
        })
          .save()
          .then((newPost) => {
            res.status(201).json(newPost);
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
