const database = require('../../model/connection');

module.exports.diemdanh=async(req,res)=>{
    const {Manv,timeIn} =req.body;
    const DayAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
   
    try {
        const query1 = 'SELECT * FROM staff WHERE deleted = "false" and Manv =? ';
        const value1=[Manv];
        const staff= await database.model(query1, value1);
        
        const MaP=staff.MaP;
        const TenNv=staff.TenNv;
       
        const insertQuery = `
          INSERT INTO ChamCong (MaP,Manv, TenNv,DayAt,timeIn,status)
          VALUES (?, ?, ?, ?, ?, 1)
        `;
      
        const values = [MaP,Manv,TenNv,DayAt,timeIn];
        // Thực thi câu lệnh INSERT
        await database.model(insertQuery, values);
        req.flash('Success', `Tạo Tài Khoản Thành Công !`);
        return res.json({
            success: true,
        });
      } catch (error) {
        console.error("Lỗi cập nhật:", error);
        return res.json({
            success: false,
            error:error
        });
      }
}