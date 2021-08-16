const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
var cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use(cookieParser("somesecret"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "somesecret",
    cookie: { maxAge: 86400000 },
  })
);

let routes = require("./routes/routes");
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
