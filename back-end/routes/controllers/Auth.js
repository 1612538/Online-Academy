const jwtHelper = require("../../helpers/jwthelpers");
const Users = require("./Users");
const bcrypt = require("../../utils/bcrypt");

let tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "my-access-token";

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";

const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || "my-refresh-token";

const login = async (req, res) => {
  try {
    const user = await Users.getByEmail(req, res);
    if (user) {
      const passwordHash = await bcrypt.checkPassword(
        req.body.password,
        user.password
      );
      if (passwordHash) {
        const userData = {
          id: user.iduser,
          email: user.email,
          role: user.role,
        };
        const accessToken = await jwtHelper.generateToken(
          userData,
          accessTokenSecret,
          accessTokenLife
        );
        const refreshToken = await jwtHelper.generateToken(
          userData,
          refreshTokenSecret,
          refreshTokenLife
        );
        tokenList[refreshToken] = { accessToken, refreshToken };
        return res
          .status(200)
          .json({ id: user.iduser, accessToken, refreshToken });
      } else return res.json({ message: "Invalid password", errorCode: 2 });
    } else return res.json({ message: "Invalid email address", errorCode: 1 });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const refreshToken = async (req, res) => {
  const refreshTokenFromClient = req.body.refreshToken;
  if (refreshTokenFromClient && tokenList[refreshTokenFromClient]) {
    try {
      const decoded = await jwtHelper.verifyToken(
        refreshTokenFromClient,
        refreshTokenSecret
      );
      const userData = decoded.data;
      const accessToken = await jwtHelper.generateToken(
        userData,
        accessTokenSecret,
        accessTokenLife
      );
      return res.status(200).json({
        accessToken,
      });
    } catch (err) {
      res.status(403).json({
        message: "Invalid refresh token",
      });
    }
  } else {
    return res.status(403).send({
      message: "No token provided",
    });
  }
};

module.exports = {
  logic: login,
  refreshToken: refreshToken,
};
