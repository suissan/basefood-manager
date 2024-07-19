const mysql = require("mysql");

// 使用するデータベースの情報を記述
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "u6e67u958b",
    database: 'base'
  });
  
  // データ・ベース接続時のログ
  connection.connect((err) => {
    if (err) {
      console.log(`error connecting: ${err.stack}`);
      return;
    }
    console.log('success!');
  });

  module.exports = connection;