const db = require("../../utils/db");
const tbName = "user";
const bcrypt = require("../../utils/bcrypt");
const mailer = require("../../utils/mailer");
const jwthelpers = require("../../helpers/jwthelpers");

module.exports = {
  getAll: (req, res) => {
    const sql = `SELECT * FROM ${tbName}`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },

  getTeacher: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE role = 1`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },

  getUser: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE role = 0`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },

  getByEmail: async (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE email = ?`;
    const results = await new Promise((resolve, reject) => {
      db.query(sql, [req.body.email], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    return results[0];
  },

  getByEmailClient: async (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE email = ?`;
    db.query(sql, [req.params.email], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result[0]);
    });
  },

  checkPassword: async (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE iduser = ?`;
    db.query(sql, [req.params.id], async (err, result) => {
      if (err) {
        throw err;
      }
      const isEqual = await bcrypt.checkPassword(
        req.params.password,
        result[0].password
      );
      res.json({ isEqual: isEqual });
    });
  },

  detail: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE iduser = ?`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length > 0) res.json(result[0]);
      else res.json(null);
    });
  },

  delete: (req, res) => {
    let sql = `DELETE FROM ${tbName} WHERE iduser = ?`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    });
  },
  update: async (req, res) => {
    let data = req.body;
    let id = req.params.id;
    if (req.body.password) {
      const passwordHash = await bcrypt.hashPassword(data.password);
      data.password = passwordHash;
    }
    const sql = `UPDATE ${tbName} SET ? WHERE iduser = ?`;
    db.query(sql, [data, id], (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    });
  },
  updateAvatar: async (req, res) => {
    let data = {
      img: "/tmp/my-uploads/" + req.files["imageInput"][0].filename,
    };
    let id = req.params.id;
    const sql = `UPDATE ${tbName} SET ? WHERE iduser = ?`;
    db.query(sql, [data, id], (err, result) => {
      if (err) throw err;
      res.json({ success: true, img: data.img });
    });
  },
  add: async (req, res) => {
    const sql = `INSERT INTO ${tbName} SET ?`;
    let data = req.body;
    const passwordHash = await bcrypt.hashPassword(data.password);
    data.password = passwordHash;
    const userData = {
      email: data.email,
    };
    const verifykey = await jwthelpers.generateToken(
      userData,
      "VERIFY_TOKEN",
      "1h"
    );
    await mailer.sendMail(
      data.email,
      "Account verification",
      `Hello, please verify your email.<br/> <a href="http://localhost:3000/verifyaccount/${data.email}/${verifykey}">Click here</a>`
    );
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    });
  },
  confirmation: async (req, res) => {
    const key = req.params.key;
    try {
      const decoded = await jwthelpers.verifyToken(key, "VERIFY_TOKEN");
      req.jwtDecoded = decoded;
    } catch (err) {
      console.log("Error while verify token: ", err);
      return res.json({ success: false });
    }
    if (req.jwtDecoded) {
      const data = {
        isVerify: 1,
      };
      const sql = `UPDATE ${tbName} SET ? WHERE email = ?`;
      db.query(sql, [data, req.params.email], (err, result) => {
        if (err) throw err;
        res.json({ success: true });
      });
    } else res.json({ success: false });
  },
};
