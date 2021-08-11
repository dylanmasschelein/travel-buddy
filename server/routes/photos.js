const express = require("express");
const router = express.Router();
const Photo = require("../models/photos");
const knex = require("knex")(require("../utils/knexfile"));
const Location = require("../models/locations");
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile, getFileStream } = require("../s3");

const upload = multer({ dest: "./uploads/" });

router
  .get("/photoPath/:key", (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);

    readStream.pipe(res);
  })

  .get("/:photoLocation", (req, res) => {
    const photoLocation = Number(req.params.photoLocation);
    knex
      .where({ photo_location_id: photoLocation })
      .select("*")
      .from("photos")
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.send("Error getting photos"));
  })

  // Create new post

  .post("/:locationId", upload.single("photo"), async (req, res) => {
    const {
      file,
      body: { title, caption },
    } = req;
    const locationId = Number(req.params.locationId);

    const result = await uploadFile(file);
    await unlinkFile(file.path);

    Location.where({ id: locationId })
      .fetch()
      .then(
        (location) => {
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
            res.status(201).send(`/photos/${result.key}`);
          });
      })
      .catch(() => res.status(404).json({ message: "Error adding photo" }));
  })

  // Delete post
  .delete("/:id", (req, res) => {
    Photo.where({ id: Number(req.params.id) })
      .destroy()
      .then(() => {
        res.status(200).json({
          message: `Photo:                                                                                                                                  ${req.params.id} deleted`,
        });
      })
      .catch(() =>
        res
          .status(400)
          .json({ message: `Error deleting phhoto ${req.params.id}` })
      );
  });

module.exports = router;
