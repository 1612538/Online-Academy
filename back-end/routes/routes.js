"use strict";
const cors = require("cors");
const AuthMiddleware = require("../utils/AuthMiddleware");
const AuthController = require("./controllers/Auth");
const upload = require("../utils/multer");
module.exports = (app) => {
  //Courses controller

  let Courses = require("./controllers/Courses");
  app.route("/api/courses").get(Courses.getAll);

  app
    .route("/api/courses/:id")
    .get(Courses.detail)
    .put(Courses.update)
    .delete(Courses.delete);

  app.route("/api/coursesbysubscribe").get(Courses.getAllBySubscribe);

  app.route("/api/coursesbydate").get(Courses.getAllByDate);

  app.route("/api/coursesbyview").get(Courses.getAllByView);

  app.route("/api/courseslength").get(Courses.getLength);

  app.route("/api/coursesearch").get(Courses.getByTextSearch);

  app.route("/api/getByTeacher/:id").get(Courses.getByTeacher);

  app.route("/api/coursesByCatID/:catid").get(Courses.getByCatID);
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
  app.route("/api/smallcategoriesbycount").get(SmallCategories.getByCount);

  //User controller
  let Users = require("./controllers/Users");
  app.route("/api/users/:id").get(Users.detail);
  app.route("/api/usersByEmail/:email").get(Users.getByEmailClient);
  app.route("/api/users").post(Users.add);
  app.route("/api/users/:id").put(Users.update);
  //Login
  app.route("/login").post(AuthController.login);
  app.route("/refresh-token").post(AuthController.refreshToken);

  app.use(AuthMiddleware.isAuth);
  //User controller

  app.route("/api/users").get(Users.getAll);
  app.route("/api/users/:id").delete(Users.delete);
  app.route("/api/checkpassword/:id/:password").get(Users.checkPassword);

  app.route("/api/courses").post(
    upload.fields([
      { name: "imageInput", maxCount: 1 },
      { name: "videoInput", maxCount: 1 },
    ]),
    Courses.add
  );

  //FavoriteCourses controller

  let FavoriteCourses = require("./controllers/FavoriteCourses");
  app
    .route("/api/favoritecourses")
    .get(FavoriteCourses.getAll)
    .post(FavoriteCourses.add);
  app
    .route("/api/favoritecourses/:iduser/:idcourses")
    .get(FavoriteCourses.getByData)
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
    .delete(EnrolledCourses.delete)
    .get(EnrolledCourses.getByData);
  app.route("/api/enrolledcourses/:iduser").get(EnrolledCourses.getByUserId);
};
