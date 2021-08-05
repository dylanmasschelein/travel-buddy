const express = require("express");
const router = express.Router();
const Photo = require("../models/photos");
const knex = require("knex")(require("../utils/knexfile"));
const Location = require("../models/locations");
const multer = require("multer");

const { uploadFile, getFileStream } = require("../s3");

const upload = multer({ dest: "./uploads/" });

router

  .get("/:key", (res, req) => {
    const key = req.parmas.key;
    const readStream = getFileStream(key);

    readStream.pipe(res);
  })
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

  .post("/:locationId", upload.single("photo"), async (req, res) => {
    const {
      file,
      body: { title, caption },
    } = req;
    const locationId = Number(req.params.locationId);
    // Upload tos3 Bucket
    const result = await uploadFile(file);
    console.log(result);

    Location.where({ id: locationId })
      .fetch()
      .then(
        (location) => {
          console.log(location);
          return location;
        },
        () => {
          res.status(404).json({ message: "Not a valid location id" });
        }
      )
      .then((location) => {
        new Photo({
          title,
          caption,
          photo_location_id: location.id,
          photo: file.filename,
        })
          .save()
          .then((newPhoto) => {
            console.log(newPhoto);
            res.status(201).json(newPhoto);
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
