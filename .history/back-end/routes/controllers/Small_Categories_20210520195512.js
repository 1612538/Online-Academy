const db = require("../../utils/db");
const tbName = "small_category";

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
  getByCatID: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE CatID = ?`;
    db.query(sql, [req.params.username], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },
  detail: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE id = ?`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result[0]);
    });
  },
  delete: (req, res) => {
    let sql = `DELETE FROM ${tbName} WHERE id = ?`;
    db.query(sql, [req.params.id], (err, result) => {
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
