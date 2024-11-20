const database = require('../../model/connection');
const systemconfig = require("../../config/system");

module.exports.loginAdmin = (req, res) => {

    if(req.cookies.token){
        res.redirect(`${systemconfig.prefixAdmin}/Account`);
    }
    else {
    res.render("admin/pages/Login", { layout: false });
    }
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
        const matchedStaff = Staff[matchedIndex];
        if (username === "admin@gmail.com" && password === "admin") {
            
            req.flash('Success', `Đăng Nhập Thành Công !`);
            res.cookie("token","admin");
            return res.redirect(`${systemconfig.prefixAdmin}/Account`);
        } else if (matchedIndex === -1) {
            req.flash('error', `Tài khoản hoặc mật khẩu không đúng!`);
            return res.redirect(`${systemconfig.prefixAdmin}/login`);
        } else {
            
    

            // Gọi save để đảm bảo lưu session trước khi chuyển hướng
            res.cookie("token",matchedStaff.token);
                req.flash('Success', `Đăng Nhập Thành Công !`);
                return res.redirect(`${systemconfig.prefixAdmin}/Account`);
           
            
           
           
        }
    } catch (error) {
        console.error("Lỗi cập nhật:", error);
        res.status(500).send('Có lỗi xảy ra khi cập nhật');
    }
};
