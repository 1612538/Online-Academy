const express = require("express");
const router = express.Router();
const passport = require("../utils/passport");
const courses = require("../models/Courses");
const Categories = require("../models/Categories");
const Small_Categories = require("../models/Small_Categories");
const Teachers = require("../models/Teachers");

router.get("/api/SmallCatID=:id", async (req, res) => {
  if (req.isAuthenticated() && req.user.type == 3) {
    let id = parseInt(req.params.id);
    const smallcat = await Small_Categories.getById(id);
    const allcourses = await courses.getByCatIDByAdmin(id);
    for (let course of allcourses) {
      const teacher = await Teachers.getById(course.teacher);
      course.teacherName = teacher.firstname + " " + teacher.lastname;
    }
    res.send({
      courses: allcourses,
    });
  } else
    res.send({
      success: false,
    });
});

router.put("/api/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let course = await courses.getByIdByAdmin(id);
  if (course.isBlocked === 0) {
    course.isBlocked = 1;
    let rs = await courses.updateByEntity(course);
  } else if (course.isBlocked === 1) {
    course.isBlocked = 0;
    let rs = await courses.updateByEntity(course);
  }
  res.send({
    success: true,
  });
});

module.exports = router;
