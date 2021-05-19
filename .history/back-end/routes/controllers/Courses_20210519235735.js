const db = require("../utils/db");
const tbName = "courses";

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
  getAllByView: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE isBlocked=0 ORDER BY views DESC limit 10`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },
  getAllByDate: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE isBlocked=0 ORDER BY STR_TO_DATE(lastupdate,'%T %d/%m/%Y') DESC limit 10;`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },

  getAllBySubscribe: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE isBlocked=0 ORDER BY subscribes DESC limit 3`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },
  detailByTeacher: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE teacher = ? AND isBlocked=0`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },

  getByTextSearch: (req, res) => {
    const sql1 = `ALTER TABLE ${tbName} ADD FULLTEXT(name);`;
    const sql2 = `SELECT * FROM ${tbName} WHERE MATCH(name) AGAINST('${req.body.fulltext}')AND isBlocked=0;`;
    const sql3 = ` ALTER TABLE ${tbName} DROP INDEX name;`;
    const sql = sql1 + sql2 + sql3;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },

  getByCatID: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE idsmall_category = ? AND isBlocked=0`;
    db.query(sql, [req.params.catid], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },

  getByCatIDByAdmin: async (CatID) => {
    const sql = `SELECT * FROM ${tbName} WHERE idsmall_category = '${CatID}'`;
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, (err, result, field) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    if (rows.length > 0) return rows;
    else return null;
  },
  detail: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE idcourses = ?`;
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
