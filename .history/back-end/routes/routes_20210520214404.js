"use strict";
module.exports = (app) => {
  //Courses controller

  let Courses = require("./controllers/Courses");
  app
    .route("/api/courses")
    .get(Courses.getAll)
    .post(
      upload.fields([
        { name: "imageInput", maxCount: 1 },
        { name: "slideInput", maxCount: 1 },
        { name: "videoInput", maxCount: 1 },
      ]),
      Courses.add
    );

  app
    .route("/api/courses/:id")
    .get(Courses.detail)
    .put(Courses.update)
    .delete(Courses.delete);

  //Categories controller

  let Categories = require("./controllers/Categories");
  app.route("/api/categories").get(Categories.getAll).post(Categories.add);
  app
    .route("/api/categories/:id")
    .get(Categories.detail)
    .put(Categories.update)
    .delete(Categories.delete);

  //Small categories controller

  let SmallCategories = require("./controllers/Small_Categories");
  app
    .route("/api/smallcategories")
    .get(SmallCategories.getAll)
    .post(SmallCategories.add);

  app
    .route("/api/smallcategories/:id")
    .get(SmallCategories.detail)
    .put(SmallCategories.update)
    .delete(SmallCategories.delete);

  app.route("/api/smallcategories/byCatID/:id").get(SmallCategories.getByCatID);

  //Admin controller

  let Admins = require("./controllers/Admins");
  app.route("/api/admins").get(Admins.getAll).post(Admins.add);
  app.route("/api/admins/:id").put(Admins.update).delete(Admins.delete);

  //User controller

  let Users = require("./controllers/Users");
  app.route("/api/users").get(Users.getAll).post(Users.add);
  app
    .route("/api/users/:id")
    .get(Users.detail)
    .put(Users.update)
    .delete(Users.delete);

  //Teachers controller

  let Teachers = require("./controllers/Teachers");
  app.route("/api/teachers").get(Teachers.getAll).post(Teachers.add);
  app
    .route("/api/teachers/:id")
    .get(Teachers.detail)
    .put(Teachers.update)
    .delete(Teachers.delete);

  //FavoriteCourses controller

  let FavoriteCourses = require("./controllers/FavoriteCourses");
  app
    .route("/api/favoritecourses")
    .get(FavoriteCourses.getAll)
    .post(FavoriteCourses.add);
  app
    .route("/api/favoritecourses/:iduser/:idcourses")
    .delete(FavoriteCourses.delete);
  app.route("/api/favoritecourses/:iduser").get(FavoriteCourses.getByUserId);

  //EnrolledCourses controller

  let EnrolledCourses = require("./controllers/EnrolledCourses");
  app
    .route("/api/enrolledcourses")
    .get(EnrolledCourses.getAll)
    .post(EnrolledCourses.add);
  app
    .route("/api/enrolledcourses/:iduser/:idcourses")
    .delete(EnrolledCourses.delete);
  app.route("/api/enrolledcourses/:iduser").get(EnrolledCourses.getByUserId);
};
