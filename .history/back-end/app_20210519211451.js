const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const createError = require("http-errors");
const exphbs = require("express-handlebars");
const passport = require("./utils/passport");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser("somesecret"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const hbs = exphbs.create({
  extname: "hbs",
  helpers: {
    if_eq: function (a, b, opts) {
      if (a == b) return opts.fn(this);
      else return opts.inverse(this);
    },
    math: function (lvalue, operator, rvalue, options) {
      lvalue = parseFloat(lvalue);
      rvalue = parseFloat(rvalue);

      return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue,
      }[operator];
    },
  },
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
//app.set('views', path.join(__dirname, 'views'));

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
