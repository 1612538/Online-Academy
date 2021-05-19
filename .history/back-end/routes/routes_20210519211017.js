"use strict";
module.exports = (app) => {
  //Courses controller

  let Courses = require("./controllers/CoursesController");
  app.route("/courses").get();
};
