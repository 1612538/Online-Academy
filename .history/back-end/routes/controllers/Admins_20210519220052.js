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
  delete: (req, res) => {
    let sql = "DELETE FROM products WHERE id = ?";
    db.query(sql, [req.params.productId], (err, response) => {
      if (err) throw err;
      res.json({ message: "Delete success!" });
    });
  },
  update: (req, res) => {
    let data = req.body;
    let id = req.params.id;
    const sql = `UPDATE ${tbName} SET ? WHERE id = ?`;
    db.query(sql, [data, id], (err, result) => {
      if (err) throw err;
      res.json({ message: "Update success!" });
    });
  },
  add: async (entity) => {
    const sql = `INSERT INTO ${tbName} SET ?`;
    let data = req.body;
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      res.json({ message: "Create success!" });
    });
  },
};
