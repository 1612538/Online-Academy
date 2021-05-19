const db = require('../utils/db');
const tbName = "category";

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
        return rows;
    },
    getById: async id => {
        const sql = `SELECT * FROM ${tbName} WHERE idcategory = '${id}'`;
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

    getByName: async name => {
        const sql = `SELECT * FROM ${tbName} WHERE name = '${name}'`;
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
    deleteById: async id => {
        const sql = `DELETE FROM ${tbName} WHERE idcategory = '${id}'`;
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
    updateByEntity: async entity => {
        const id = entity['idcategory'];
        const sql = `UPDATE ${tbName} SET ? WHERE idcategory = '${id}'`;
        const rows = await new Promise((resolve, reject) => {
            db.query(sql, entity, (err, result, field) => {
                if (err) {
                    reject(err);
                }
                resolve(result.changedRows);
            })
        });
        return rows;
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
    }
}