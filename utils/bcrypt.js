const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

exports.checkPassword = async (password, passwordHash) => {
  const result = await bcrypt.compare(password, passwordHash);
  return result;
};
