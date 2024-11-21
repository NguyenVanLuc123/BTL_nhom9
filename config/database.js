const mysql = require('mysql2');
require("dotenv").config();

module.exports.connectDatabase = () => {
  // Tạo một pool kết nối
  const pool = mysql.createPool({
    host: process.env.host,
    port: process.env.MYSQL_PORT,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    waitForConnections: true, // Đợi kết nối nếu không còn kết nối trống
    connectionLimit: 10,      // Số lượng kết nối tối đa trong pool
    queueLimit: 0             // Số lượng yêu cầu được xếp hàng (0 là không giới hạn)
  });

  // Kiểm tra kết nối
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Lỗi kết nối MySQL Pool:', err.stack);
      return;
    }
    console.log('Kết nối thành công với MySQL Pool, ID của kết nối:', connection.threadId);
    connection.release(); // Trả lại kết nối vào pool sau khi kiểm tra xong
  });

  // Trả về pool để sử dụng trong ứng dụng
  return pool;
};
