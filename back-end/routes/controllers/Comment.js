const db = require("../../utils/db");
const tbName = "feedback";

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
  add: async (req, res) => {
    const sql = `INSERT INTO ${tbName} SET ?`;
    let data = req.body;
    data.createAt = currentDate();
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      const sql2 = `SELECT rate FROM ${tbName} WHERE idcourse = ?`;
      db.query(sql2, [data.idcourse], (err, result2) => {
        if (err) throw err;
        let sum = 0;
        for (let i of result2) sum += i.rate;
        const aver = sum / result2.length;
        res.json({
          success: true,
          data: data,
          rate: aver.toFixed(1),
          ratevotes: result2.length,
        });
      });
    });
  },
};
