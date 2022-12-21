const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { hash } = require("bcrypt");
const { status } = require("express/lib/response");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user != null) {
        let err = new Error(`User ${req.body.username} already exists.`);
        res.status(400);
        return next(err);
      }

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return next(err);
        let user = new User();
        user.username = req.body.username;
        user.password = hash;
        if (req.body.role) user.role = req.body.role;
        user
          .save()
          .then((user) => {
            res.status(201).json({
              status: "User registered Successfully",
              userId: user._id,
              username: user.username,
              role: user.role,
            });
          })
          .catch(next);
      });
    })
    .catch(next);
});

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user == null) {
        let err = new Error(`User ${req.body.username} has not registered`);
        res.status(404);
        return next(err);
      }

      bcrypt.compare(req.body.password, user.password, (err, status) => {
        if (err) return next(err);
        if (!status) {
          let err = new Error("Password doesnt match.");
          res.json(401);
          return next(err);
        }

        let data = {
          userId: user._id,
          username: user.username,
          role: user.role,
        };
        jwt.sign(
          data,
          process.env.SECRET,
          { expiresIn: "1d" },
          (err, token) => {
            if (err) return next(err);
            res.json({
              status: "Login Sucessfull",
              token: token,
            });
          }
        );
      });
    })
    .catch(next);
});

module.exports = router;
