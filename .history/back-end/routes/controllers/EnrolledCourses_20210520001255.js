const db = require("../utils/db");
const tbName = "subscribecourses";

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
  getByUserId: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE iduser = ?`;
    db.query(sql, [req.params.userid], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },

  getByTwoID: async (id1, id2) => {
    const sql = `SELECT * FROM ${tbName} WHERE iduser = '${id1}' AND idcourses = '${id2}'`;
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, (err, result, field) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    if (rows.length > 0) return rows[0];
    else return null;
  },

  add: async (entity) => {
    const sql = `INSERT INTO ${tbName} SET ?`;
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, entity, (err, result, field) => {
        if (err) reject(err);
        resolve(result.insertId);
      });
    });
    return rows;
  },

  delete: (req, res) => {
    let sql = `DELETE FROM ${tbName} WHERE iduser = ? AND idcourses = ?`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.json({ message: "Delete success!" });
    });
  },

  add: (req, res) => {
    const sql = `INSERT INTO ${tbName} SET ?`;
    let data = req.body;
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      res.json({ message: "Create success!" });
    });
  },
};
