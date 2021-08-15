const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "bur1dbenl8eypkeaoxc8-mysql.services.clever-cloud.com",
  user: "uqxj2zet5dxfwv0o",
  port: 3306,
  password: "GvjILWxk3asXawFpoMos",
  database: "bur1dbenl8eypkeaoxc8",
  multipleStatements: true,
});

// let connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   port: 3306,
//   password: "050398",
//   database: "online_academy",
//   multipleStatements: true,
// });

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else console.log("Connected!");
});

module.exports = connection;
