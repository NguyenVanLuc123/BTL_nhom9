const database = require('../../model/connection');

module.exports.diemdanh=async(req,res)=>{
    const {Manv,timeIn} =req.body;
    const DayAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
   
    try {
        const query1 = 'SELECT * FROM staff WHERE deleted = "false" and Manv =? ';
        const value1=[Manv];
        const query2 = 'SELECT * FROM CaLamViec WHERE deleted = ?  ';
        const value2=["false"];
        const staff= await database.model(query1, value1);
        const Calam=await database.model(query2, value2);
        const status=0;
       for(let i=0;i<Calam.length;i++){
        if( Calam.MaC=="O"&&timeIn<=Calam.timeIn){
          status=1;
          break;
        }
       }
       
        const MaP=staff[0].MaP;
        const TenNv=staff[0].TenNv;
        const insertQuery = `
          INSERT INTO ChamCong (MaP,Manv, TenNv,DayAt,timeIn,status)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
      
        const values = [MaP,Manv,TenNv,DayAt,timeIn,status];
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