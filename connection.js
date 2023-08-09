const mysql = require("mysql2");
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Vedprakash0@",
  database: "blogdb",
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log("Database not connected:" + JSON.stringify(err, undefined, 2));
  } else {
    console.log("Database connected");
  }
});

module.exports = mysqlConnection;
