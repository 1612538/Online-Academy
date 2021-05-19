const express = require("express");
const router = express.Router();

const users = require("../models/Users");
const teachers = require("../models/Teachers");
const admins = require("../models/Admins");
const passport = require("../utils/passport");
const smallcat = require("../models/Small_Categories");
const cat = require("../models/Categories");
const bcrypt = require("../utils/bcrypt");
const Teachers = require("../models/Teachers");
const Users = require("../models/Users");

router
  .get("/accountInfo/api", async (req, res) => {
    if (req.isAuthenticated()) {
      if (req.user.type === 3) type = 3;
      else if (req.user.type === 2) type = 2;
      else type = 1;
    }
    res.send({
      user: req.user,
      type: type,
    });
  })
  .post("/accountInfo/api", async (req, res) => {
    if (req.user.type === 3) {
      const entity = {
        username: req.body.username,
        password: await bcrypt.hashPassword(req.body.password),
      };
      const row = await admins.updateByEntity(entity);
    } else {
      const check = await Teachers.getByEmail(req.body.email);
      const check2 = await Users.getByEmail(req.body.email);
      if (check != null) {
        if (req.body.username != check.username)
          return res.send({
            message: "Fail updating: New email has already been used.",
          });
      } else if (check2 != null) {
        if (req.body.username != check2.username)
          return res.send({
            message: "Fail updating: New email has already been used.",
          });
      } else {
        const entity = {
          username: req.body.username,
          password: await bcrypt.hashPassword(req.body.password),
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
        };
        if (req.user.type === 2) {
          entity.workplace = req.body.workplace;
          entity.overview = req.body.overview;
          const row = await teachers.updateByEntity(entity);
        } else {
          const row = await users.updateByEntity(entity);
        }
        return res.send({
          user: entity,
          message: "Account Updated",
        });
      }
    }
    return res.send({
      message: "Account Updated Error",
    });
  });

module.exports = router;
