const express = require("express");
const router = express.Router();
const Cat = require("../models/Categories");
const SmallCat = require("../models/Small_Categories");
const bodyParser = require("body-parser");
const Admin = require("../models/Admins");
const User = require("../models/Users");
const Teacher = require("../models/Teachers");
const bcrypt = require("../utils/bcrypt");

router
  .get("/admin/api", async (req, res) => {
    const admins = await Admin.all();
    const cats = await Cat.all();
    const smallcats = await SmallCat.all();
    console.log("Aaa");
    res.render("admin_admin", {
      title: "Management - Admin",
      cats: cats,
      smallcats: smallcats,
      admins: admins,
      message: req.query.message,
      layout: "admin",
    });
  })
  .post("/admin/api", async (req, res) => {
    const admin = {
      username: req.body.adminNameNew,
      password: req.body.adminPasswordNew,
    };
    const user = await User.getByUsername(admin.username);
    const teacher = await Teacher.getByUsername(admin.username);
    const ad = await Admin.getByUsername(admin.username);
    let adminID;
    if (user != null || teacher != null || ad != null) {
      res.send({
        message: "Username has been already used",
        success: false,
      });
      return;
    } else {
      admin.password = await bcrypt.hashPassword(admin.password);
      adminID = await Admin.add(admin);
      return res.send({
        newAdmin: admin,
      });
    }
  })
  .delete("/admin/api/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    const admin = await Admin.deleteById(id);
    res.redirect("/management/admins");
  });

module.exports = router;
