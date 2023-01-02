const express = require("express");
const upload = require("../middleware/upload");
const Profile = require("../models/profile");
const router = express.Router();

router
  .route("/")
  .get((req, res, next) => {
    profile
      .find()
      .then((profiles) => {
        res.json(profiles);
      })
      .catch(next);
  })
  .post(upload.single("profile"), (req, res, next) => {
    let profile = {
      ...req.body,
      image: req.file.filename,
      user: req.user.userId,
    };
    Profile
      .create(profile)
      .then((profile) => {
        res.status(201).json(profile);
      })
      .catch(next);
  });
module.exports = router;
