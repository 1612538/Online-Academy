const db = require("../../utils/db");
const tbName = "feedback";

module.exports = {
  getAllByCourse: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE idcourse = ?`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
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
    const sql = `UPDATE ${tbName} SET ? WHERE idfeedback = ?`;
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
