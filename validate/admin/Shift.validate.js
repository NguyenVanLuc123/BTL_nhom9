const database = require('../../model/connection');
module.exports.createShift = async (req, res, next) => {
  const query = 'SELECT ?? FROM CaLamViec';
  const values = ["MaC"];
  const Staff = await database.model(query, values);

  // Kiểm tra trùng mã nhân viên
  const isDuplicate = Staff.some(element => element.MaC === req.body.MaC);

  if (isDuplicate) {
    req.flash('error', 'Mã ca đã tồn tại!');
    return res.redirect('back'); // Dừng ở đây và quay lại trang trước
  }

  // Nếu không có lỗi, gọi next() để tiếp tục đến controller
  next();
};
