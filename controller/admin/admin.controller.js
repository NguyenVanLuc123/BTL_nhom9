const database = require('../../model/connection');
const systemconfig = require("../../config/system");

module.exports.trangchu = async (req, res) => {
  const title = "Danh sách tài khoản";
  const values = ["false"];
  try {
    // Truy vấn tất cả phòng ban
    const query1 = 'SELECT * FROM PhongBan WHERE deleted = ?';
    const query2 = 'SELECT * FROM staff WHERE deleted = ?';
    
    const PhongBanResults = await database.model(query1, values);
    const StaffResults = await database.model(query2, values);

    // Truyền dữ liệu vào view
    res.render('admin/pages/Account/trangchu', { 
      title, 
      PhongBan: PhongBanResults, 
      staff: StaffResults 
    });

  } catch (error) {
    console.log('Lỗi truy vấn cơ sở dữ liệu:', error.stack);
    res.status(500).send('Lỗi cơ sở dữ liệu');
  }
};

module.exports.editPatch = async (req, res) => {
  const { MANV, Name, office, image, Username, password } = req.body;
  
  // Sử dụng định dạng chuẩn MySQL (YYYY-MM-DD HH:MM:SS)
  const DayAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  try {
    const updateQuery = `
      UPDATE staff
      SET 
        TenNv = ?, 
        Chucv = ?, 
        image = ?,
        username = ?, 
        password = ?, 
        DayAt = ?
      WHERE Manv = ?
    `;
    
    const values = [Name, office, image, Username, password, DayAt, MANV];

    // Thực thi câu lệnh UPDATE
    await database.model(updateQuery, values);
    req.flash('Success', `Sửa Thông Tin Tài Khoản Thành Công !`);
    res.redirect(`${systemconfig.prefixAdmin}/Account`);
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    res.status(500).send('Có lỗi xảy ra khi cập nhật');
  }
};

module.exports.deleted = async (req, res) => {
  const id_deleted = req.params.Manv;

  try {
    const values = [id_deleted];
    const updateQuery = `
      UPDATE staff
      SET 
        deleted = "true"
      WHERE Manv = ?
    `;
    
    // Thực thi câu lệnh UPDATE
    await database.model(updateQuery, values);
    req.flash('Success', `Xóa Tài Khoản ${id_deleted} Thành Công !`);
    res.redirect(`${systemconfig.prefixAdmin}/Account`);
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    res.status(500).send('Có lỗi xảy ra khi cập nhật');
  }
};

module.exports.CreatAccountPost = async (req, res) => {
  const { MANV, Name, office, image, Username, password } = req.body;
  const MaP = req.params.MaP;
  
  // Sử dụng định dạng chuẩn MySQL (YYYY-MM-DD HH:MM:SS)
  const DayCreat = new Date().toISOString().slice(0, 19).replace('T', ' ');

  try {
    const insertQuery = `
      INSERT INTO staff (Manv, TenNv, Chucv, image, username, password, DayCreat, MaP, deleted)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, "false")
    `;
  
    const values = [MANV, Name, office, image, Username, password, DayCreat, MaP];
    // Thực thi câu lệnh INSERT
    await database.model(insertQuery, values);
    req.flash('Success', `Tạo Tài Khoản Thành Công !`);
    res.redirect(`${systemconfig.prefixAdmin}/Account`);
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    res.status(500).send('Có lỗi xảy ra khi cập nhật');
  }
};
