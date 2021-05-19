const db = require("../utils/db");
const tbName = "favoritecourses";

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
  delete: (req, res) => {
    let sql = `DELETE FROM ${tbName} WHERE iduser = ? AND idcourses = ?`;
    db.query(sql, [req.params.iduser, req.params.idcourses], (err, result) => {
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
