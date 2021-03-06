const db = require("../../utils/db");
const tbName = "courses";
const fs = require("fs");

function currentDate() {
  var date = new Date();
  var dateStr =
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2) +
    " " +
    ("00" + date.getDate()).slice(-2) +
    "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear();
  return dateStr;
}

const deleteImage = async (req, res) => {
  const sqltmp = `SELECT * FROM ${tbName} WHERE idcourses = ?`;
  const results = await new Promise((resolve, reject) => {
    db.query(sqltmp, [req.params.id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
  const results2 = await new Promise((resolve, reject) => {
    if (req.files["imageInput"] !== undefined) {
      fs.unlink("./public" + results[0].img, (err) => {
        if (err) console.log(err);
        else console.log("File deleted: " + results[0].img);
      });
      const img = "/tmp/my-uploads/" + req.files["imageInput"][0].filename;
      resolve(img);
    } else resolve("");
  });
  const results3 = await new Promise((resolve, reject) => {
    if (req.files["videoInput"] !== undefined) {
      fs.unlink("./public" + results[0].previewvideo, (err) => {
        if (err) console.log(err);
        else console.log("File deleted: " + results[0].previewvideo);
      });
      const previewvideo =
        "/tmp/my-uploads/" + req.files["videoInput"][0].filename;
      resolve(previewvideo);
    } else resolve("");
  });
  let data = {};
  if (results2 !== "") data.img = results2;
  if (results3 !== "") data.previewvideo = results3;
  return data;
};

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

  getAllByAdmin: (req, res) => {
    const pageNumber = parseInt(req.query.page) - 1;
    let sql = `SELECT * FROM ${tbName}`;
    if (pageNumber > -1)
      sql = `SELECT * FROM ${tbName} limit ${pageNumber * 5},5`;
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
    let sql = `SELECT * FROM ${tbName} WHERE isBlocked=0 ORDER BY STR_TO_DATE(createAt,'%T %d/%m/%Y') DESC limit 10;`;
    if (pageNumber > -1)
      sql = `SELECT * FROM ${tbName} WHERE isBlocked=0 ORDER BY STR_TO_DATE(createAt,'%T %d/%m/%Y') DESC limit ${
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
    const sql = `SELECT * FROM ${tbName} WHERE isBlocked=0 ORDER BY subscribes DESC limit 4`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },
  getBySubscribeAndCat: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE isBlocked=0 AND idsmall_category = ? ORDER BY subscribes DESC limit 5`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },
  getByTeacher: (req, res) => {
    const pageNumber = parseInt(req.query.page) - 1;
    let sql = `SELECT * FROM ${tbName} WHERE teacher = ? AND isBlocked=0`;
    if (pageNumber > -1)
      sql = `SELECT * FROM ${tbName} WHERE teacher = ? AND isBlocked=0 limit ${
        pageNumber * 5
      },5`;
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

  getByMainCatID: (req, res) => {
    const pageNumber = parseInt(req.query.page) - 1;
    const isRateDesc = parseInt(req.query.isratedesc);
    const isPriceAsc = parseInt(req.query.ispriceasc);
    const cmd =
      "courses.idcourses, courses.name, courses.teacher, courses.rate, courses.ratevotes, courses.price, courses.description1, courses.description2, courses.lastupdate, courses.isCompleted, courses.idsmall_category, courses.img, courses.previewvideo, courses.subscribes, courses.views, courses.isBlocked, courses.createAt";
    let sql = `SELECT ${cmd} FROM ${tbName} INNER JOIN small_category ON small_category.idcategory = ? AND ${tbName}.idsmall_category = small_category.idsmall_category WHERE isBlocked=0`;
    if (pageNumber > -1)
      if (isRateDesc === 1)
        sql = `SELECT ${cmd} FROM ${tbName} INNER JOIN small_category ON small_category.idcategory = ? AND ${tbName}.idsmall_category = small_category.idsmall_category WHERE isBlocked=0 ORDER BY rate DESC limit ${
          pageNumber * 5
        },5;`;
      else if (isPriceAsc === 1)
        sql = `SELECT ${cmd} FROM ${tbName} INNER JOIN small_category ON small_category.idcategory = ? AND ${tbName}.idsmall_category = small_category.idsmall_category WHERE isBlocked=0 ORDER BY price ASC limit ${
          pageNumber * 5
        },5;`;
      else
        sql = `SELECT ${cmd} FROM ${tbName} INNER JOIN small_category ON small_category.idcategory = ? AND ${tbName}.idsmall_category = small_category.idsmall_category WHERE isBlocked=0 limit ${
          pageNumber * 5
        },5;`;
    db.query(sql, [req.params.catid], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },

  getQuantityByCatID: (req, res) => {
    const sql = `SELECT COUNT(*) AS count FROM ${tbName} WHERE idsmall_category = ?`;
    db.query(sql, [req.params.catid], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result[0]);
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
    const sql = `SELECT * FROM ${tbName} WHERE idcourses = ? AND isBlocked=0`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length > 0) res.json(result[0]);
      else res.json(null);
    });
  },

  delete: (req, res) => {
    let sql = `DELETE FROM ${tbName} WHERE idcourses = ?`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    });
  },

  update: async (req, res) => {
    let data = {};
    if (req.files) {
      data = await deleteImage(req, res);
    } else data = req.body;
    let id = req.params.id;
    console.log(data);
    const sql = `UPDATE ${tbName} SET ? WHERE idcourses = ?`;
    db.query(sql, [data, id], (err, result) => {
      if (err) throw err;
      res.json({
        success: true,
        img: data.img ? data.img : "",
        previewvideo: data.previewvideo ? data.previewvideo : "",
      });
    });
  },

  updateView: (req, res) => {
    const data = {
      views: req.body.views,
    };
    let id = req.params.id;
    const sql = `UPDATE ${tbName} SET ? WHERE idcourses = ?`;
    db.query(sql, [data, id], (err, result) => {
      if (err) throw err;
      res.json({
        success: true,
      });
    });
  },

  add: (req, res) => {
    const sql = `INSERT INTO ${tbName} SET ?`;
    const course = {
      name: req.body.name,
      price: req.body.price,
      idsmall_category: req.body.smallcategory,
      rate: 0,
      ratevotes: 0,
      teacher: req.body.idteacher,
      description1: req.body.briefDesc,
      description2: req.body.detailDesc,
      lastupdate: currentDate(),
      createAt: currentDate(),
      isCompleted: 0,
      img: "/tmp/my-uploads/" + req.files["imageInput"][0].filename,
      subscribes: 0,
      previewvideo: "/tmp/my-uploads/" + req.files["videoInput"][0].filename,
      isBlocked: 0,
      views: 0,
    };
    db.query(sql, [course], (err, result) => {
      if (err) throw err;
      res.json({ success: 1 });
    });
  },
};
