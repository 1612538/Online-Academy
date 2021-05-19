const db = require('../utils/db');
const tbName = "subscribecourses";

module.exports = {
    all: async() => {
        const sql = `SELECT * FROM ${tbName}`;
        const rows = await new Promise((resolve, reject) => {
            db.query(sql, (err, result, field) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        });
        if (rows.length > 0)
            return rows;
        return null;
    },
    getByUserId: async id => {
        const sql = `SELECT * FROM ${tbName} WHERE iduser = '${id}'`;
        const rows = await new Promise((resolve, reject) => {
            db.query(sql, (err, result, field) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        });
        if (rows.length > 0)
            return rows;
        return null;
    },
    getByCourseID: async id => {
        const sql = `SELECT * FROM ${tbName} WHERE idcourses = '${id}'`;
        const rows = await new Promise((resolve, reject) => {
            db.query(sql, (err, result, field) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        });
        if (rows.length > 0)
            return rows;
        else return null;
    },

    getByTwoID: async(id1, id2) => {
        const sql = `SELECT * FROM ${tbName} WHERE iduser = '${id1}' AND idcourses = '${id2}'`;
        const rows = await new Promise((resolve, reject) => {
            db.query(sql, (err, result, field) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        });
        if (rows.length > 0)
            return rows[0];
        else return null;
    },

    add: async entity => {
        const sql = `INSERT INTO ${tbName} SET ?`;
        const rows = await new Promise((resolve, reject) => {
            db.query(sql, entity, (err, result, field) => {
                if (err)
                    reject(err);
                resolve(result.insertId);
            })
        });
        return rows;
    },

    deleteById: async(id1, id2) => {
        const sql = `DELETE FROM ${tbName} WHERE iduser = '${id1}' AND idcourses = '${id2}'`;
        const rows = await new Promise((resolve, reject) => {
            db.query(sql, (err, result, field) => {
                if (err) {
                    reject(err);
                }
                resolve(result.affectedRows);
            })
        });
        return rows;
    },
}