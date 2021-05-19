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

  //Small categories controller

  let SmallCategories = require("./controllers/SmallCatController");
  app
    .route("/api/categories")
    .get(SmallCategories.getAll)
    .post(SmallCategories.add);

  app
    .route("api/smallcategories/:id")
    .get(SmallCategories.detail)
    .put(SmallCategories.update)
    .delete(SmallCategories.delete);

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

  //Teachers controller
  let Teachers = require("./controllers/TeacherController");
  app.route("/api/teachers").get(Teachers.getAll).post(Teachers.add);
  app
    .route("api/teachers/:id")
    .get(Teachers.detail)
    .put(Teachers.update)
    .delete(Teachers.delete);
};
