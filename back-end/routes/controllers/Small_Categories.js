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
    const sql = `SELECT * FROM ${tbName} WHERE idcategory = ?`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },
  getByCount: (req, res) => {
    const sql = `SELECT * FROM ${tbName} ORDER BY count DESC limit 3`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },
  detail: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE idsmall_category = ?`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result[0]);
    });
  },
  delete: (req, res) => {
    let sql = `DELETE FROM ${tbName} WHERE idsmall_category = ?`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    });
  },
  update: (req, res) => {
    let data = req.body;
    let id = req.params.id;
    const sql = `UPDATE ${tbName} SET ? WHERE idsmall_category = ?`;
    db.query(sql, [data, id], (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    });
  },
  updateCount: (req, res) => {
    let data = {
      count: req.body.count,
    };
    let id = req.params.id;
    const sql = `UPDATE ${tbName} SET ? WHERE idsmall_category = ?`;
    db.query(sql, [data, id], (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    });
  },
  add: (req, res) => {
    const sql = `INSERT INTO ${tbName} SET ?`;
    const scat = {
      name: req.body.name,
      idcategory: req.body.idcategory,
      count: req.body.count,
      img: "/tmp/my-uploads/" + req.files["imageInput"][0].filename,
    };
    db.query(sql, [scat], (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    });
  },
};
