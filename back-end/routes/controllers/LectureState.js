const db = require("../../utils/db");
const tbName = "lecturestate";

module.exports = {
  getByUserAndCourse: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE iduser = ? AND idcourses = ?`;
    db.query(sql, [req.params.iduser, req.params.idcourses], (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length > 0) res.json(result);
      else res.json({ success: false });
    });
  },

  checkExist: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE iduser = ? AND idcourses = ? AND idlecture = ?`;
    db.query(
      sql,
      [req.params.iduser, req.params.idcourses, req.params.idlecture],
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result.length > 0)
          res.json({ isExist: true, lecturestate: result[0] });
        else res.json({ isExist: false });
      }
    );
  },

  delete: (req, res) => {
    let sql = `DELETE FROM ${tbName} WHERE iduser = ? AND idcourses = ?`;
    db.query(sql, [req.params.iduser, req.params.idcourses], (err, result) => {
      if (err) throw err;
      res.json({ success: 1 });
    });
  },

  update: (req, res) => {
    let data = req.body;
    const sql = `UPDATE ${tbName} SET ? WHERE iduser = ? AND idcourses = ? AND idlecture = ?`;
    db.query(
      sql,
      [data, req.params.iduser, req.params.idcourses, req.params.idlecture],
      (err, result) => {
        if (err) throw err;
        res.json({ success: true });
      }
    );
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
