"use strict";
const cors = require("cors");
const AuthMiddleware = require("../utils/AuthMiddleware");
const AuthController = require("./controllers/Auth");
const upload = require("../utils/multer");
module.exports = (app) => {
  //Web hook
  let webhook = require("./controllers/Webhook");
  app.route("/webhook").get(webhook.webhookget);
  app.route("/webhook").post(webhook.webhookpost);

  //Courses controller

  let Courses = require("./controllers/Courses");
  app.route("/api/courses").get(Courses.getAll);

  app.route("/api/coursesView/:id").put(Courses.updateView);

  app.route("/api/courses/:id").get(Courses.detail);

  app.route("/api/coursesbysubscribe").get(Courses.getAllBySubscribe);

  app.route("/api/coursesbydate").get(Courses.getAllByDate);

  app.route("/api/coursesbyview").get(Courses.getAllByView);

  app.route("/api/courseslength").get(Courses.getLength);

  app.route("/api/coursesearch").get(Courses.getByTextSearch);

  app.route("/api/getByTeacher/:id").get(Courses.getByTeacher);

  app.route("/api/coursesByCatID/:catid").get(Courses.getByCatID);

  app.route("/api/coursesByMainCatID/:catid").get(Courses.getByMainCatID);

  app.route("/api/coursesNumber/:catid").get(Courses.getQuantityByCatID);
  app
    .route("/api/coursesbysubscribeandcat/:id")
    .get(Courses.getBySubscribeAndCat);

  let CourseLectures = require("./controllers/CourseLectures");

  app.route("/api/courselectures/:id").get(CourseLectures.getByCourse);
  //Categories controller

  let Categories = require("./controllers/Categories");
  app.route("/api/categories").get(Categories.getAll);
  app.route("/api/categories/:id").get(Categories.detail);

  //Small categories controller

  let SmallCategories = require("./controllers/Small_Categories");
  app.route("/api/smallcategories").get(SmallCategories.getAll);

  app.route("/api/smallcategories/:id").get(SmallCategories.detail);

  app.route("/api/smallcategories/byCatID/:id").get(SmallCategories.getByCatID);
  app.route("/api/smallcategoriesbycount").get(SmallCategories.getByCount);

  app.route("/api/smallcategories/:id").put(SmallCategories.updateCount);

  //Comment controller
  let Comment = require("./controllers/Comment");
  app.route("/api/commentsbycourse/:id").get(Comment.getAllByCourse);

  //User controller
  let Users = require("./controllers/Users");
  app.route("/api/users/:id").get(Users.detail);
  app.route("/api/usersByEmail/:email").get(Users.getByEmailClient);
  app.route("/api/users").post(Users.add);
  app.route("/api/users/:id").put(Users.update);
  app.route("/api/confirmation/:email/:key").get(Users.confirmation);
  //Login
  app.route("/login").post(AuthController.login);
  app.route("/refresh-token").post(AuthController.refreshToken);

  app.use(AuthMiddleware.isAuth);
  //User controller

  app.route("/api/users").get(Users.getAll);
  app.route("/api/userslist").get(Users.getUser);
  app.route("/api/teacherslist").get(Users.getTeacher);
  app.route("/api/users/:id").delete(Users.delete);
  app.route("/api/checkpassword/:id/:password").get(Users.checkPassword);

  app.route("/api/courses").post(
    upload.fields([
      { name: "imageInput", maxCount: 1 },
      { name: "videoInput", maxCount: 1 },
    ]),
    Courses.add
  );

  app.route("/api/courses/:id").put(
    upload.fields([
      { name: "imageInput", maxCount: 1 },
      { name: "videoInput", maxCount: 1 },
    ]),
    Courses.update
  );
  app.route("/api/courses/:id").delete(Courses.delete);
  app.route("/api/coursesByAdmin/:catid").get(Courses.getByCatIDByAdmin);
  app.route("/api/coursesByAdmin").get(Courses.getAllByAdmin);

  app
    .route("/api/smallcategories")
    .post(
      upload.fields([{ name: "imageInput", maxCount: 1 }]),
      SmallCategories.add
    );

  app
    .route("/api/smallcategories/:id")
    .put(SmallCategories.update)
    .delete(SmallCategories.delete);

  //Comment controller
  app.route("/api/comments/:id").put(Comment.update).delete(Comment.delete);
  app.route("/api/comments").post(Comment.add);

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

  app
    .route("/api/enrolledcourses/:iduser/:idcourses")
    .put(EnrolledCourses.update);

  //Course lectures

  app
    .route("/api/courselectures")
    .post(
      upload.fields([{ name: "videoInput", maxCount: 1 }]),
      CourseLectures.add
    );
  app
    .route("/api/courselectures/:idcourse/:idlecture")
    .get(CourseLectures.getDetail)
    .delete(CourseLectures.delete)
    .put(
      upload.fields([{ name: "videoInput", maxCount: 1 }]),
      CourseLectures.update
    );

  //Lectures state
  let LectureState = require("./controllers/LectureState");
  app
    .route("/api/lecturestate/:iduser/:idcourses")
    .get(LectureState.getByUserAndCourse)
    .delete(LectureState.delete);
  app
    .route("/api/lecturestate/:iduser/:idcourses/:idlecture")
    .get(LectureState.checkExist)
    .put(LectureState.update);
  app.route("/api/lecturestate").post(LectureState.add);

  //Categories
  app.route("/api/categories").post(Categories.add);
  app
    .route("/api/categories/:id")
    .put(Categories.update)
    .delete(Categories.delete);
};
