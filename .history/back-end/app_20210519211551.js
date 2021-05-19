const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const createError = require("http-errors");
const passport = require("./utils/passport");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser("somesecret"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "somesecret",
    cookie: { maxAge: 86400000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

let routes = require("./routes/routes");
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

function loggedInAsAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.type === 3) {
    next();
  } else {
    console.log(req.user.type + "aa");
    res.redirect("/login");
  }
}

function loggedInAsTeacher(req, res, next) {
  if (req.isAuthenticated() && req.user.type === 2) {
    next();
  } else {
    console.log(req.user.type + "cc");
    res.redirect("/login");
  }
}

function loggedInAsUser(req, res, next) {
  if (req.isAuthenticated() && req.user.type === 1) {
    next();
  } else {
    res.redirect("/login");
  }
}

function loggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}
