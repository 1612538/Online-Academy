const express = require("express");
const router = express.Router();

const users = require("../models/Users");
const teachers = require("../models/Teachers");
const admins = require("../models/Admins");
const passport = require("../utils/passport");
const smallcat = require("../models/Small_Categories");
const cat = require("../models/Categories");
const bcrypt = require("../utils/bcrypt");
const courses = require("../models/Courses");
const Categories = require("../models/Categories");
const Small_Categories = require("../models/Small_Categories");

router.get("/", async (req, res) => {
  let type = 0;
  let username = null;
  if (req.isAuthenticated()) {
    username = req.user.username;
    if (req.user.type === 3) type = 3;
    else if (req.user.type === 2) type = 2;
    else type = 1;
  }
  res.send({
    user: req.user,
    type: type,
    message: null,
  });
});

router
  .get("/login", (req, res) => {
    res.send({});
  })
  .post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      } else {
        if (!user) {
          return res.send({
            message: "Incorrect username or password",
            isLogin: false,
          });
        } else {
          req.login(user, function (err) {
            if (err) {
              return next(err);
            } else {
              res.send({
                isLogin: true,
              });
            }
          });
        }
      }
    })(req, res, next);
  });

router
  .get("/signup", (req, res) => {
    res.send({});
  })
  .post("/signup", async (req, res) => {
    const check1 = await users.getByUsername(req.body.username);
    const check11 = await teachers.getByUsername(req.body.username);
    const check12 = await admins.getByUsername(req.body.username);
    const check2 = await users.getByEmail(req.body.email);
    const check21 = await teachers.getByEmail(req.body.email);
    if (check1 != null || check11 != null || check12 != null)
      return res.send({
        isSignup: false,
        message: "Username has already been used.",
      });
    else if (check2 != null || check21 != null)
      return res.send({
        isSignup: false,
        message: "This email has already been used.",
      });
    const user = {
      username: req.body.username,
      password: await bcrypt.hashPassword(req.body.password),
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      isBlocked: 0,
    };
    const iduser = await users.add(user);
    req.login(user, function (err) {
      if (err) {
        return next(err);
      } else {
        return res.send({
          isLogin: true,
          message: "Signed up successfully.",
        });
      }
    });
  });

router.get("/logout", (req, res) => {
  if (!req.user) res.redirect("/login");
  else {
    req.logOut();
    res.send({
      isLogin: false,
    });
  }
});

module.exports = router;
