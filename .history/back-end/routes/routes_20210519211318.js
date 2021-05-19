"use strict";
module.exports = (app) => {
  //Courses controller

  let Courses = require("./controllers/CoursesController");
  app.route("/api/courses")
  .get(Courses.)
  .post()
  .delete();
};
