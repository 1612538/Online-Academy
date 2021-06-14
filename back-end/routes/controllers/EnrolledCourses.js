const db = require("../../utils/db");
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
  getByData: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE iduser = ? AND idcourses = ?`;
    db.query(sql, [req.params.iduser, req.params.idcourses], (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length > 0) res.json(result[0]);
      else res.json({ success: false });
    });
  },
  getByUserId: (req, res) => {
    const pageNumber = parseInt(req.query.page) - 1;
    let sql = `SELECT * FROM ${tbName} WHERE iduser = ?`;
    if (pageNumber > -1)
      sql = `SELECT * FROM ${tbName} WHERE iduser = ? limit ${
        pageNumber * 5
      },5`;
    db.query(sql, [req.params.iduser], (err, result) => {
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
      res.json({ success: 1 });
    });
  },

  update: (req, res) => {
    let data = req.body;
    const sql = `UPDATE ${tbName} SET ? WHERE iduser = ? AND idcourses = ?`;
    db.query(
      sql,
      [data, req.params.iduser, req.params.idcourses],
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
      res.json({ success: 1 });
    });
  },
};
