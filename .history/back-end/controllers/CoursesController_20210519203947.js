const express = require("express");
const router = express.Router();
const passport = require("../utils/passport");
const courses = require("../models/Courses");
const Categories = require("../models/Categories");
const Small_Categories = require("../models/Small_Categories");
const Teachers = require("../models/Teachers");

router.get("/", async (req, res) => {
  if (req.isAuthenticated() && req.user.type == 3) {
    const cats = await Categories.all();
    const smallcats = await Small_Categories.all();
    const allcourses = await courses.all();
    res.render("admin", {
      cats: cats,
      smallcats: smallcats,
      title: "Online Academy - Courses",
      courses: allcourses,
      layout: "admin",
    });
  } else res.redirect("/login");
});

router.get("/api/SmallCatID=:id", async (req, res) => {
  if (req.isAuthenticated() && req.user.type == 3) {
    const cats = await Categories.all();
    const smallcats = await Small_Categories.all();
    let id = parseInt(req.params.id);
    const smallcat = await Small_Categories.getById(id);
    const allcourses = await courses.getByCatIDByAdmin(id);
    for (let course of allcourses) {
      const teacher = await Teachers.getById(course.teacher);
      course.teacherName = teacher.firstname + " " + teacher.lastname;
    }
    res.render("admin_courses", {
      cats: cats,
      smallcats: smallcats,
      title: "Courses" + smallcat.name,
      courses: allcourses,
      layout: "courses",
    });
  } else res.redirect("/login");
});

router.post("/lockcourse/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let course = await courses.getByIdByAdmin(id);
  if (course.isBlocked === 0) {
    course.isBlocked = 1;
    let rs = await courses.updateByEntity(course);
  }
  res.redirect("/management/courses/SmallCatID=" + course.idsmall_category);
});

router.post("/unlockcourse/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let course = await courses.getByIdByAdmin(id);
  if (course.isBlocked === 1) {
    course.isBlocked = 0;
    let rs = await courses.updateByEntity(course);
  }

  res.redirect("/management/courses/SmallCatID=" + course.idsmall_category);
});

module.exports = router;
