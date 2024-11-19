const database = require('../../model/connection');
const systemconfig = require("../../config/system");

module.exports.someOtherPage = (req, res) => {
    if (!req.session.manager || !req.session.staff) {
        req.flash('error', 'Bạn phải đăng nhập trước.');
        return res.redirect('/login');  // Chuyển hướng đến trang đăng nhập nếu chưa có dữ liệu
    }

    // Render lại trang với thông tin đã lưu trong session
    return res.render("manager/pages/Account/trangchu", {
        manager: req.session.manager,
        staff: req.session.staff,
        layout: 'manager/layout/default'
    });
}

module.exports.editPatch = async (req, res) => {
    const { MANV, Name, office, image, Username, password } = req.body;
    const MaP = req.params.MaP;
    
    // Lấy thời gian hiện tại theo định dạng chuẩn MySQL (YYYY-MM-DD HH:MM:SS)
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
        const query1 = `select * from staff where MaP = ? AND Chucv!="manager" AND deleted="false"`;
        const values1 = [MaP];
        const Staff_PhongBan = await database.model(query1, values1);
        req.session.staff = Staff_PhongBan;
        req.flash('Success', `Sửa Thông Tin Tài Khoản Thành Công !`);
        res.redirect(`${systemconfig.prefixManager}/Account`);
    } catch (error) {
        console.error("Lỗi cập nhật:", error);
        res.status(500).send('Có lỗi xảy ra khi cập nhật');
    }
};

module.exports.CreatAccountPost = async (req, res) => {
    const { MANV, Name, office, image, Username, password } = req.body;
    const MaP = req.params.MaP;
    
    // Lấy thời gian tạo tài khoản theo định dạng chuẩn MySQL (YYYY-MM-DD HH:MM:SS)
    const DayCreat = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
        const insertQuery = `
            INSERT INTO staff (Manv, TenNv, Chucv, image, username, password, DayCreat, MaP, deleted)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, "false")
        `;
    
        const values = [MANV, Name, office, image, Username, password, DayCreat, MaP];
        // Thực thi câu lệnh INSERT
        await database.model(insertQuery, values);
        const query1 = `select * from staff where MaP = ? AND Chucv!="manager" AND deleted="false"`;
        const values1 = [MaP];
        const Staff_PhongBan = await database.model(query1, values1);
        req.session.staff = Staff_PhongBan;
        req.flash('Success', `Tạo Tài Khoản Thành Công !`);
        res.redirect(`${systemconfig.prefixManager}/Account`);
    } catch (error) {
        console.error("Lỗi cập nhật:", error);
        res.status(500).send('Có lỗi xảy ra khi cập nhật');
    }
};

module.exports.deleted = async (req, res) => {
    const id_deleted = req.params.Manv;
    const MaP = req.params.MaP;
    
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
        const query1 = `select * from staff where MaP = ? AND Chucv!="manager" AND deleted="false"`;
        const values1 = [MaP];
        const Staff_PhongBan = await database.model(query1, values1);
        req.session.staff = Staff_PhongBan;
        req.flash('Success', `Xóa Tài Khoản ${id_deleted} Thành Công !`);
        res.redirect(`${systemconfig.prefixManager}/Account`);
    } catch (error) {
        console.error("Lỗi cập nhật:", error);
        res.status(500).send('Có lỗi xảy ra khi cập nhật');
    }
};
