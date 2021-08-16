const db = require("../../utils/db");
const tbName = "courselectures";
const upload = require("../../utils/multer");
const fs = require("fs");

const deleteVideo = async (req, res) => {
  const sqltmp = `SELECT * FROM ${tbName} WHERE idcourse = ? AND idlecture = ?`;
  const results = await new Promise((resolve, reject) => {
    db.query(
      sqltmp,
      [req.params.idcourse, req.params.idlecture],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
  const results3 = await new Promise((resolve, reject) => {
    if (req.files["videoInput"] !== undefined) {
      fs.unlink("./public" + results[0].video, (err) => {
        if (err) console.log(err);
        else console.log("File deleted: " + results[0].video);
      });
      const video = "/tmp/my-uploads/" + req.files["videoInput"][0].filename;
      resolve(video);
    } else resolve("");
  });
  let data = {};
  if (results3 !== "") data.video = results3;
  return data;
};

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
    const lecture = {
      idcourse: req.body.idcourse,
      idlecture: req.body.idlecture,
      title: req.body.title,
      description: req.body.description,
      video: "/tmp/my-uploads/" + req.files["videoInput"][0].filename,
    };
    db.query(sql, [lecture], (err, result) => {
      if (err) throw err;
      res.json({ success: 1, video: lecture.video });
    });
  },
  delete: (req, res) => {
    let sql = `DELETE FROM ${tbName} WHERE idcourse = ? AND idlecture = ?`;
    db.query(
      sql,
      [req.params.idcourse, req.params.idlecture],
      (err, result) => {
        if (err) throw err;
        res.json({ success: true });
      }
    );
  },
  update: async (req, res) => {
    let data = {};
    if (req.files) {
      data = await deleteVideo(req, res);
    }
    if (req.body.title) data.title = req.body.title;
    if (req.body.description) data.description = req.body.description;
    console.log(data);
    const sql = `UPDATE ${tbName} SET ? WHERE idcourse = ? AND idlecture = ?`;
    db.query(
      sql,
      [data, req.params.idcourse, req.params.idlecture],
      (err, result) => {
        if (err) throw err;
        res.json({
          success: true,
          video: data.video ? data.video : "",
        });
      }
    );
  },
};
