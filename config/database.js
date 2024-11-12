// model/database.js
const mysql = require('mysql2');
require("dotenv").config();
module.exports.connectDatabase = () => {
  const connection = mysql.createConnection({
    host: process.env.host,
    port: process.env.MYSQL_PORT,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  });

  // Kết nối tới MySQL
  connection.connect(function (err) {
    if (err) {
      console.log('Lỗi kết nối MySQL:', err.stack);
      return;
    }
    console.log('Kết nối thành công với MySQL, ID của kết nối:', connection.threadId);
  });

  // Trả về connection để sử dụng trong các phần khác của ứng dụng
  return connection;
};
