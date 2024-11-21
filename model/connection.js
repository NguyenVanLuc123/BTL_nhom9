// model/model.js
const database = require('../config/database');
const pool = database.connectDatabase();  // Sử dụng pool thay vì connection

module.exports.model = async (QueryString, values) => {
  return await new Promise((resolve, reject) => {
    // Dùng pool.query thay vì connection.query
    pool.query(QueryString, values, function (error, results) {
      if (error) return reject(error);
      resolve(results);
    });
  });
};