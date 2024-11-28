const databases = require('../../model/connection');
const systemconfig = require("../../config/system");
module.exports.trangchu = async (req, res) => {
  const title = "Danh sách Chấm Công";
  const values = ["false"]; // Giá trị cho deleted = false

  // Lấy ngày tìm kiếm từ query, nếu không có thì mặc định là ngày hiện tại
  const searchDate = req.query.searchDate ? req.query.searchDate : new Date().toISOString().split('T')[0]; // Ngày hiện tại

  try {
    // Truy vấn dữ liệu từ ChamCong và kết hợp với PhongBan
    const queryChamCong = `
      SELECT cc.*, pb.TenP 
      FROM ChamCong cc 
      JOIN PhongBan pb ON cc.MaP = pb.MaP 
      WHERE pb.deleted = ? 
      ${searchDate ? "AND cc.DayAt = ?" : ""}
      ORDER BY cc.DayAt, cc.MaP`;

    const ChamCongResults = searchDate 
      ? await databases.model(queryChamCong, [...values, searchDate])
      : await databases.model(queryChamCong, values);
    
    const Phong= `select * from PhongBan where `

    // Nhóm dữ liệu theo ngày
    const groupedByDate = ChamCongResults.reduce((acc, record) => {
      // Chỉ lấy phần ngày (yyyy-mm-dd) từ record.DayAt
      const date = record.DayAt.toLocaleDateString('vi-VN'); // Hoặc sử dụng 'en-GB' nếu bạn muốn định dạng dd/mm/yyyy
      if (!acc[date]) acc[date] = [];
      acc[date].push(record);
      return acc;
    }, {});

    // Truyền dữ liệu vào view
    res.render('admin/pages/timekeeping/trangchu', { 
      title, 
      ChamCong: groupedByDate,
      searchDate 
    });

  } catch (error) {
    console.log('Lỗi truy vấn cơ sở dữ liệu:', error.stack);
    res.status(500).send('Lỗi cơ sở dữ liệu');
  }
};


  
  