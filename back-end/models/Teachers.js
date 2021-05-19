const db = require('../utils/db');
const tbName = "teacher";

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
    getByUsername: async username => {
        const sql = `SELECT * FROM ${tbName} WHERE username = '${username}'`;
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

    getByEmail: async email => {
        const sql = `SELECT * FROM ${tbName} WHERE email = '${email}'`;
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

    getById: async id => {
        const sql = `SELECT * FROM ${tbName} WHERE idteacher = '${id}'`;
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
        const sql = `DELETE FROM ${tbName} WHERE idteacher = '${id}'`;
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
        const username = entity['username'];
        const sql = `UPDATE ${tbName} SET ? WHERE username = '${username}'`;
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