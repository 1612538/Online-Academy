const db = require("../../utils/db");
const tbName = "courses";

module.exports = {
  getAll: (req, res) => {
    const pageNumber = parseInt(req.query.page) - 1;
    let sql = `SELECT * FROM ${tbName} WHERE isBlocked=0`;
    if (pageNumber > -1)
      sql = `SELECT * FROM ${tbName} WHERE isBlocked=0 limit ${
        pageNumber * 5
      },5`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },

  getLength: (req, res) => {
    const sql = `SELECT COUNT(*) AS rowCount FROM ${tbName}`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result[0]);
    });
  },

  getAllByView: (req, res) => {
    const pageNumber = parseInt(req.query.page) - 1;
    let sql = `SELECT * FROM ${tbName} WHERE isBlocked=0 ORDER BY views DESC limit 10`;
    if (pageNumber > -1)
      sql = `SELECT * FROM ${tbName} WHERE isBlocked=0 ORDER BY views DESC limit ${
        pageNumber * 5
      },5`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },

  getAllByDate: (req, res) => {
    const pageNumber = parseInt(req.query.page) - 1;
    let sql = `SELECT * FROM ${tbName} WHERE isBlocked=0 ORDER BY STR_TO_DATE(lastupdate,'%T %d/%m/%Y') DESC limit 10;`;
    if (pageNumber > -1)
      sql = `SELECT * FROM ${tbName} WHERE isBlocked=0 ORDER BY STR_TO_DATE(lastupdate,'%T %d/%m/%Y') DESC limit ${
        pageNumber * 5
      },5`;
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
    const pageNumber = parseInt(req.query.page) - 1;
    const isRateDesc = parseInt(req.query.isratedesc);
    const isPriceAsc = parseInt(req.query.ispriceasc);
    const sql1 = `ALTER TABLE ${tbName} ADD FULLTEXT(name);`;
    let sql2 = `SELECT * FROM ${tbName} WHERE MATCH(name) AGAINST ('${req.query.keyword}') AND isBlocked=0;`;
    if (pageNumber > -1)
      if (isRateDesc === 1)
        sql2 = `SELECT * FROM ${tbName} WHERE MATCH(name) AGAINST ('${
          req.query.keyword
        }') AND isBlocked=0 ORDER BY rate DESC limit ${pageNumber * 5},5;`;
      else if (isPriceAsc === 1)
        sql2 = `SELECT * FROM ${tbName} WHERE MATCH(name) AGAINST ('${
          req.query.keyword
        }') AND isBlocked=0 ORDER BY price ASC limit ${pageNumber * 5},5;`;
      else
        sql2 = `SELECT * FROM ${tbName} WHERE MATCH(name) AGAINST ('${
          req.query.keyword
        }') AND isBlocked=0 limit ${pageNumber * 5},5;`;
    const sql3 = ` ALTER TABLE ${tbName} DROP INDEX name;`;
    const sql = sql1 + sql2 + sql3;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result[1]);
    });
  },

  getByCatID: (req, res) => {
    const pageNumber = parseInt(req.query.page) - 1;
    const isRateDesc = parseInt(req.query.isratedesc);
    const isPriceAsc = parseInt(req.query.ispriceasc);
    let sql = `SELECT * FROM ${tbName} WHERE idsmall_category = ? AND isBlocked=0`;
    if (pageNumber > -1)
      if (isRateDesc === 1)
        sql = `SELECT * FROM ${tbName} WHERE idsmall_category = ? AND isBlocked=0 ORDER BY rate DESC limit ${
          pageNumber * 5
        },5;`;
      else if (isPriceAsc === 1)
        sql = `SELECT * FROM ${tbName} WHERE idsmall_category = ? AND isBlocked=0 ORDER BY price ASC limit ${
          pageNumber * 5
        },5;`;
      else
        sql = `SELECT * FROM ${tbName} WHERE idsmall_category = ? AND isBlocked=0 limit ${
          pageNumber * 5
        },5;`;
    db.query(sql, [req.params.catid], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },

  getByCatIDByAdmin: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE idsmall_category = ?`;
    db.query(sql, [req.params.catid], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
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
    let sql = `DELETE FROM ${tbName} WHERE idcourses = ?`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.json({ message: "Delete success!" });
    });
  },
  update: (req, res) => {
    let data = req.body;
    let id = req.params.id;
    const sql = `UPDATE ${tbName} SET ? WHERE idcourses = ?`;
    db.query(sql, [data, id], (err, result) => {
      if (err) throw err;
      res.json({ message: "Update success!" });
    });
  },
  add: (res, req) => {
    const sql = `INSERT INTO ${tbName} SET ?`;
    let data = req.body;
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      res.json({ message: "Create success!" });
    });
  },
};
