const systemconfig=require("../../config/system");
const database = require('../../model/connection');
module.exports.requireAuth= async(req,res,next)=>{
        if(!req.cookies.token){
            res.redirect(`${systemconfig.prefixAdmin}/login`)
        }
        else{
            const query = `
  SELECT staff.*, PhongBan.TenP 
  FROM staff 
  JOIN PhongBan ON staff.MaP = PhongBan.MaP 
  WHERE staff.deleted = 'false' AND staff.token = ?;
`;

            const value=[req.cookies.token];
            const user= await  database.model(query, value);
            if(user||req.cookies.token=="admin"){
               
                if(req.cookies.token!="admin"){
                    res.locals.Manager=user;
                }
                else{
                    res.locals.Manager=[{
                        Chucv:"admin",
                        TenNv:"Quản Lý Tổng"
                    }]
                }
                next();
            }
            else{
                res.redirect(`${systemconfig.prefixAdmin}/login`)
            }
        }
}