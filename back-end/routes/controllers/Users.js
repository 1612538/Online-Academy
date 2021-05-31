const db = require("../../utils/db");
const tbName = "user";
const bcrypt = require("../../utils/bcrypt");

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
      res.json(result[0]);
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
  add: async (req, res) => {
    const sql = `INSERT INTO ${tbName} SET ?`;
    let data = req.body;
    const passwordHash = await bcrypt.hashPassword(data.password);
    data.password = passwordHash;
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    });
  },
};
