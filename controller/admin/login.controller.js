
const database = require('../../model/connection');
const systemconfig = require("../../config/system");
module.exports.loginAdmin= (req,res)=>{
    res.render("admin/pages/Login", { layout: false })
}

module.exports.loginAdminPost = async (req, res) => {
    const username = req.body.Username;
    const password = req.body.password;
    const query = `SELECT 
    staff.*, 
    PhongBan.TenP
FROM 
    staff
JOIN 
    PhongBan 
ON 
    staff.MaP = PhongBan.MaP
WHERE 
    staff.Chucv = ? AND staff.deleted="false"`;
    const values = ["manager"];

    try {
        const Staff = await database.model(query, values);

        let matchedIndex = -1;

        Staff.forEach((item, index) => {
            if (item.username === username && item.password === password) {
                matchedIndex = index;
            }
        });
        if (username == "admin@gmail.com" && password == "admin") {
            req.flash('Success', `Đăng Nhập Thành Công !`);
            return res.redirect(`${systemconfig.prefixAdmin}/Account`);
        } 
        else if (matchedIndex === -1) {
            req.flash('error', `Tài khoản hoặc mật khẩu không đúng!`);
            return res.redirect('back');
        } else {
            const matchedStaff = Staff[matchedIndex];
            const query1 = `select * from staff where MaP = ? AND Chucv!="manager" AND deleted="false"`;
            const values1 = [`${matchedStaff.MaP}`];
            const Staff_PhongBan = await database.model(query1, values1);
            
            // Lưu vào session
            req.session.manager = matchedStaff;
            req.session.staff = Staff_PhongBan;

            // Chuyển hướng đến trang khác để render lại
            req.flash('Success', `Đăng Nhập Thành Công !`);
            return res.redirect(`${systemconfig.prefixManager}/Account`);  // Thay thế đường dẫn này theo yêu cầu của bạn
        }
    } catch (error) {
        console.error("Lỗi cập nhật:", error);
        res.status(500).send('Có lỗi xảy ra khi cập nhật');
    }
}
