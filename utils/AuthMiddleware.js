const jwtHelper = require("../helpers/jwthelpers");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "my-access-token";

const isAuth = async (req, res, next) => {
  const tokenFromClient =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (tokenFromClient)
    try {
      const decoded = await jwtHelper.verifyToken(
        tokenFromClient,
        accessTokenSecret
      );
      req.jwtDecoded = decoded;
      next();
    } catch (err) {
      console.log("Error while verify token: ", err);
      return res.json({
        message: "Unauthorized",
      });
    }
  else {
    return res.send({
      message: "No token provided.",
    });
  }
};

module.exports = {
  isAuth: isAuth,
};
