const database = require('../../model/connection');
module.exports.createDepartment = async (req, res, next) => {
  const query = 'SELECT ?? FROM PhongBan';
  const values = ["MaP"];
  const Staff = await database.model(query, values);

  // Kiểm tra trùng mã nhân viên
  const isDuplicate = Staff.some(element => element.MaP === req.body.MaP);

  if (isDuplicate) {
    req.flash('error', 'Mã phòng ban đã tồn tại!');
    return res.redirect('back'); // Dừng ở đây và quay lại trang trước
  }

  // Nếu không có lỗi, gọi next() để tiếp tục đến controller
  next();
};
