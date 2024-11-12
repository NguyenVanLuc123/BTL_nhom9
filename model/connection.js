const database= require('../config/database')
const connection = database.connectDatabase();
module.exports.model= async (QueryString,values)=>{

return await new Promise((resolve, reject) => {
    connection.query(QueryString,values, function (error, results) {
      if (error) return reject(error);
      resolve(results);
    });
  })}