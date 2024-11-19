const database = require('../../model/connection');



module.exports.dataLoginClient=async (req,res)=>{
    const username = req.body.Username;
    const password = req.body.password;
    const query = `select * from staff where ChucV = ? AND deleted="false"`;
    const values = ["staff"];
   
    
    try {
        const Staff = await database.model(query, values);
       
        let matchedIndex = -1;
    
       
        Staff.forEach((item, index) => {
            if (item.username === username && item.password === password) {
                matchedIndex = index;
            }
        });
    
        
    
        if (matchedIndex === -1) { 
            return res.json({ success: false, message: "Username or password is incorrect" });
        } else {
            const matchedStaff = Staff[matchedIndex];
            return res.json({
                success: true,
                Manv:matchedStaff.Manv,
                name: matchedStaff.TenNv,
                MaP:matchedStaff.MaP,
            });
        }
    } catch (error) {
        console.error("Lỗi cập nhật:", error);
        res.status(500).send('Có lỗi xảy ra khi cập nhật');
    }
    
}

