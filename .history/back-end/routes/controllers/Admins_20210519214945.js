const db = require("../utils/db");
const tbName = "admin";

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
  getByUsername: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE username = ?`;
    db.query(sql, [req.params.username], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result[0]);
    });
  },
  getByID: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE idadmin = ?`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result[0]);
    });
  },
  deleteById: async (id) => {
    const sql = `DELETE FROM ${tbName} WHERE idadmin = '${id}'`;
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, (err, result, field) => {
        if (err) {
          reject(err);
        }
        resolve(result.affectedRows);
      });
    });
    return rows;
  },
  updateByEntity: async (entity) => {
    const username = entity["username"];
    const sql = `UPDATE ${tbName} SET ? WHERE username = '${username}'`;
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, entity, (err, result, field) => {
        if (err) {
          reject(err);
        }
        resolve(result.changedRows);
      });
    });
    return rows;
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
};
