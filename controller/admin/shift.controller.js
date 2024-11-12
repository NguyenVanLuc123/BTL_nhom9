const database = require('../../model/connection');
const systemconfig = require("../../config/system");

module.exports.trangchu = async (req, res) => {
    const title = "Danh sách ca làm việc";
    const values = ["false"];
    try {
      // Truy vấn tất cả phòng ban
      const query1 = 'SELECT * FROM CaLamViec WHERE deleted = ?';
      
      
      const CaLamViecResults = await database.model(query1, values);
      
      // Truyền dữ liệu vào view
      res.render('admin/pages/shift/trangchu', { 
        title, 
        QLCa: CaLamViecResults, 
      });
  
    } catch (error) {
      console.log('Lỗi truy vấn cơ sở dữ liệu:', error.stack);
      res.status(500).send('Lỗi cơ sở dữ liệu');
    }
  };

module.exports.CreatShiftGet=(req,res)=>{
    const title="Tạo Ca Làm Việc";
    
    res.render('admin/pages/shift/CreatShift', { 
      title
    });
}

module.exports.CreatShiftPost=async (req,res)=>{
    
    try {
  
      const { MaC, TenC,TimeIn,TimeOut } = req.body;
    
    const DayCreat = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const insertQuery = `
      INSERT INTO CaLamViec (MaC, TenC ,timeIn,timeOut,  DayCreate, deleted)
      VALUES (?, ?, ?,?,?,?)
    `;
  
    const values = [MaC,TenC,TimeIn,TimeOut, DayCreat,"false"];
  
      // Thực thi câu lệnh Create
      await database.model(insertQuery,values);
      req.flash('Success', `Tạo Ca Làm Việc Thành Công !`);
      res.redirect(`${systemconfig.prefixAdmin}/Shift`);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      res.status(500).send('Có lỗi xảy ra khi cập nhật');
    }
  }

  module.exports.editGet= async (req,res)=>{
    const title="Sửa Thông Tin Ca Làm";
    
    try {
     const value=[req.params.MaC];
    const query=`SELECT * FROM CaLamViec where MaC=? `
      const StaffResults = await database.model(query,value)
  
      
      res.render('admin/pages/shift/edit', { 
        title,  
        staff: StaffResults 
      });
      
    } catch (error) {
      console.log('Lỗi truy vấn cơ sở dữ liệu:', error.stack);
      res.status(500).send('Lỗi cơ sở dữ liệu');
    }
    
  }

  module.exports.editPatch = async (req, res) => {
    const { MaC, Name, TimeIn, TimeOut } = req.body;
    const DayAt = new Date().toLocaleString('en-CA', { hour12: false }).replace(',', '');
  
    
    try {
      const updateQuery = `
        UPDATE CaLamViec
        SET 
          TenC = ?, 
          timeIn = ?, 
          timeOut = ?, 
          DayAt = ?
        WHERE MaC = ?
      `;
      
      const values = [Name,TimeIn, TimeOut,DayAt, MaC];
  
      // Thực thi câu lệnh UPDATE
      await database.model(updateQuery,values);
      req.flash('Success', `Sửa Thông Tin Ca Làm Thành Công !`);
      res.redirect(`${systemconfig.prefixAdmin}/Shift`);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      res.status(500).send('Có lỗi xảy ra khi cập nhật');
    }
  };

  module.exports.deleted= async(req,res)=>{
    const id_deleted= req.params.MaC;
  
    try {
      const values=[id_deleted]
      const updateQuery = `
        UPDATE CaLamViec
        SET 
         deleted ="true"
        WHERE MaC = ?
      `;
      
  
      // Thực thi câu lệnh UPDATE
      await database.model(updateQuery,values);
      req.flash('Success', `Xóa Ca ${id_deleted} Thành Công !`);
      res.redirect(`${systemconfig.prefixAdmin}/Shift`);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      res.status(500).send('Có lỗi xảy ra khi cập nhật');
    }
  }