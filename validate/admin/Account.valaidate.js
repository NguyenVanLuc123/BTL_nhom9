const database = require('../../model/connection');
module.exports.createAccount = async (req, res, next) => {
  const query = 'SELECT ?? FROM staff';
  const values = ["Manv"];
  const Staff = await database.model(query, values);
  const query2 = 'SELECT ?? FROM staff';
  const values2 = ["username"];
  const Staff2 = await database.model(query2, values2);
  // Kiểm tra trùng mã nhân viên
  const isDuplicate = Staff.some(element => element.Manv === req.body.MANV);
  const isDuplicate2 = Staff2.some(element => element.username === req.body.Username);

  if (isDuplicate) {
    req.flash('error', `Mã nhân viên ${req.body.MANV} đã tồn tại!`);
    return res.redirect('back'); // Dừng ở đây và quay lại trang trước
  }
  else if(isDuplicate2){
    req.flash('error', `username  ${req.body.Username} đã tồn tại!`);
    return res.redirect('back');
  }
  // Nếu không có lỗi, gọi next() để tiếp tục đến controller
  next();
};
