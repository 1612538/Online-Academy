"use strict";
module.exports = (app) => {
  //Courses controller

  let Courses = require("./controllers/CoursesController");
  app.route("/api/courses").get(Courses.getAll).post(Courses.add);

  app
    .route("/api/courses/:id")
    .get(Courses.detail)
    .put(Courses.update)
    .delete(Courses.delete);

  //Categories controller

  let Categories = require("./controllers/CategoriesController");
  app.route("/api/categories").get(Categories.getAll).post(Categories.add);

  app
    .route("api/categories/:id")
    .get(Categories.detail)
    .put(Categories.update)
    .delete(Categories.delete);

  //Admin controller
  let Admins = require("./controllers/AdminController");
  app.route("/api/admins").get(Admins.getAll).post(Admins.add);
  app.route("api/admins/:id").put(Admins.update).delete(Admins.delete);

  //User controller
  let Users = require("./controllers/UserController");
  app.route("/api/users").get(Users.getAll).post(Users.add);
  app
    .route("api/users/:id")
    .get(Users.detail)
    .put(Users.update)
    .delete(Users.delete);
};
