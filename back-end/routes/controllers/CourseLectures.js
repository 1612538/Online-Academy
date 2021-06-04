const db = require("../../utils/db");
const tbName = "courselectures";
const upload = require("../../utils/multer");

module.exports = {
  getByCourse: (req, res) => {
    const pageNumber = parseInt(req.query.page) - 1;
    let sql = `SELECT * FROM ${tbName} WHERE idcourse = ?`;
    if (pageNumber > -1)
      sql = `SELECT * FROM ${tbName} WHERE idcourse = ? limit ${
        pageNumber * 5
      },5`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },
  getDetail: (req, res) => {
    const sql = `SELECT * FROM ${tbName} WHERE idcourse = ? AND idlecture = ?`;
    db.query(
      sql,
      [req.params.idcourse, req.params.idlecture],
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result.length > 0) res.json(result[0]);
        else res.json({ success: false });
      }
    );
  },
  add: (req, res) => {
    const sql = `INSERT INTO ${tbName} SET ?`;
    const course = {
      idcourse: req.body.idcourse,
      idlecture: req.body.idlecture,
      title: req.body.title,
      description: req.body.description,
      video: "/tmp/my-uploads/" + req.files["videoInput"][0].filename,
    };
    db.query(sql, [course], (err, result) => {
      if (err) throw err;
      res.json({ success: 1 });
    });
  },
};
