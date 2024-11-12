const database = require('../../model/connection');
const systemconfig = require("../../config/system");

module.exports.trangchu = async (req, res) => {
    const title = "Danh sách Phòng Ban";
    const values = ["false"];
    try {
      // Truy vấn tất cả phòng ban
      const query1 = 'SELECT * FROM PhongBan WHERE deleted = ?';
      const query2 = 'SELECT * FROM staff WHERE deleted = ? AND Chucv= "manager"';
      
      const PhongBanResults = await database.model(query1, values);
      const StaffResults = await database.model(query2, values);

      // Truyền dữ liệu vào view
      res.render('admin/pages/Department/trangchu', { 
        title, 
        PhongBan: PhongBanResults, 
        staff: StaffResults 
      });
  
    } catch (error) {
      console.log('Lỗi truy vấn cơ sở dữ liệu:', error.stack);
      res.status(500).send('Lỗi cơ sở dữ liệu');
    }
  };

  module.exports.CreatDepartmentGet= (req,res)=>{
    const title="Tạo Phòng Ban";
    
    res.render('admin/pages/Department/CreatDepartment', { 
      title
    });
  }
  
  module.exports.CreatDepartmentPost=async (req,res)=>{
    
    try {
  
      const { MaP, TenP } = req.body;
    
    const DayCreat = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const insertQuery = `
      INSERT INTO PhongBan (MaP, TenP ,  DayCreat, deleted)
      VALUES (?, ?, ?,?)
    `;
  
    const values = [MaP,TenP, DayCreat,"false"];
  
      // Thực thi câu lệnh Create
      await database.model(insertQuery,values);
      req.flash('Success', `Tạo Phòng Ban Thành Công !`);
      res.redirect(`${systemconfig.prefixAdmin}/Department`);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      res.status(500).send('Có lỗi xảy ra khi cập nhật');
    }
  }

  module.exports.deleted= async(req,res)=>{
    const id_deleted=req.params.MaP;
  try {
    const values=[id_deleted]
    const updateQuery = `
      UPDATE PhongBan
      SET 
       deleted ="true"
      WHERE MaP = ?
    `;
    

    // Thực thi câu lệnh UPDATE
    await database.model(updateQuery,values);
    req.flash('Success', `Xóa phong ${id_deleted} Thành Công !`);
    res.redirect(`${systemconfig.prefixAdmin}/Department`);
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    res.status(500).send('Có lỗi xảy ra khi cập nhật');
  }
  }