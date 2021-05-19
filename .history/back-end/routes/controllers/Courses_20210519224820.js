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

  getById: async (id) => {
    const sql = `SELECT * FROM ${tbName} WHERE idcourses = '${id}' AND isBlocked=0`;
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, (err, result, field) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    if (rows.length > 0) return rows[0];
    return null;
  },

  getByIdByAdmin: async (id) => {
    const sql = `SELECT * FROM ${tbName} WHERE idcourses = '${id}'`;
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, (err, result, field) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    if (rows.length > 0) return rows[0];
    return null;
  },

  getByIdTeacher: async (id) => {
    const sql = `SELECT * FROM ${tbName} WHERE teacher = '${id}' AND isBlocked=0`;
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, (err, result, field) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    if (rows.length > 0) return rows;
    return null;
  },

  getByTextSearch: async (str) => {
    const sql1 = `ALTER TABLE ${tbName} ADD FULLTEXT(name);`;
    const sql2 = `SELECT * FROM ${tbName} WHERE MATCH(name) AGAINST('${str}')AND isBlocked=0;`;
    const sql3 = ` ALTER TABLE ${tbName} DROP INDEX name;`;
    const sql = sql1 + sql2 + sql3;
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, (err, result, field) => {
        if (err) {
          console.log(result);
          reject(err);
        }
        resolve(result);
      });
    });
    if (rows.length > 0) return rows[1];
    return null;
  },
  getByName: async (name) => {
    const sql = `SELECT * FROM ${tbName} WHERE name = '${name}' AND isBlocked=0`;
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, (err, result, field) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    if (rows.length > 0) return rows[0];
    else return null;
  },
  getByCatID: async (CatID) => {
    const sql = `SELECT * FROM ${tbName} WHERE idsmall_category = '${CatID}' AND isBlocked=0`;
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

  add: async (entity) => {
    const sql = `INSERT INTO ${tbName} SET ?`;
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, entity, (err, result, field) => {
        if (err) reject(err);
        resolve(result.insertId);
      });
    });
    return rows;
  },

  deleteById: async (id) => {
    const sql = `DELETE FROM ${tbName} WHERE idcourses = '${id}'`;
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, (err, result, field) => {
        if (err) {
          reject(err);
        }
        resolve(result.affectedRows);
      });
    });
    return rows;
  },
  updateByEntity: async (entity) => {
    const id = entity["idcourses"];
    const sql = `UPDATE ${tbName} SET ? WHERE idcourses = '${id}'`;
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, entity, (err, result, field) => {
        if (err) {
          reject(err);
        }
        resolve(result.changedRows);
      });
    });
    return rows;
  },
};
