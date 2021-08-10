const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const knex = require("knex")(require("../utils/knexfile"));
const Adventure = require("../models/adventures");
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile, getFileStream } = require("../s3");

const upload = multer({ dest: "./uploads/" });

router
  .get("/photo/:key", (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);

    readStream.pipe(res);
  })
  .get("/:userid", (req, res) => {
    knex
      .where({ user_id: req.params.userid })
      .select("*")
      .from("adventures")
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => res.send("Error getting warehouses data"));
  })

  .get("/", (req, res) => {
    knex
      .select("*")
      .from("adventures")
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => res.send("Error getting warehouses data"));
  })

  // Create new post

  .post("/", upload.single("photo"), async (req, res) => {
    const {
      file,
      body: { id, stay, country, title },
    } = req;

    const result = await uploadFile(file);
    await unlinkFile(file.path);
    console.log(file);

    User.where({ id })
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
        new Adventure({
          country,
          length_of_stay: stay,
          user_id: user.id,
          title,
          photo: file.filename,
        })
          .save()
          .then((newPost) => {
            res.status(201).json(newPost);
          });
      })
      .catch(() =>
        res.status(404).json({ message: "Error creating adventure" })
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
        res.status(404).json({ message: "Error updating adventure" });
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
