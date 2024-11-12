const database = require('../../model/connection');
module.exports.createAccount = async (req, res, next) => {
  const query = 'SELECT ?? FROM staff';
  const values = ["MaNv"];
  const Staff = await database.model(query, values);

  // Kiểm tra trùng mã nhân viên
  const isDuplicate = Staff.some(element => element.MaNv === req.body.MANV);

  if (isDuplicate) {
    req.flash('error', 'Mã nhân viên đã tồn tại!');
    return res.redirect('back'); // Dừng ở đây và quay lại trang trước
  }

  // Nếu không có lỗi, gọi next() để tiếp tục đến controller
  next();
};
