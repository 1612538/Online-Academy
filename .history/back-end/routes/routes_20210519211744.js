"use strict";
module.exports = (app) => {
  //Courses controller

  let Courses = require("./controllers/CoursesController");
  app.route("/api/courses").get(Courses.get).post(Courses.add);

  app
    .route("/api/courses/:id")
    .get(Courses.detail)
    .put(Courses.update)
    .delete(Courses.delete);
};
