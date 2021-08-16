const db = require("../../utils/db");
const tbName = "category";

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
  detail: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE idcategory = ?`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result[0]);
    });
  },
  delete: (req, res) => {
    let sql = `DELETE FROM ${tbName} WHERE idcategory = ?`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    });
  },
  update: (req, res) => {
    let data = req.body;
    let id = req.params.id;
    const sql = `UPDATE ${tbName} SET ? WHERE idcategory = ?`;
    db.query(sql, [data, id], (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    });
  },
  add: (req, res) => {
    const sql = `INSERT INTO ${tbName} SET ?`;
    let data = req.body;
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    });
  },
};
