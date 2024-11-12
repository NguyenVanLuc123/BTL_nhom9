const systemconfig= require("../../config/system")
const admin_router=require("./admin.router")
const Department_router=require("./department.router")
const shift_router=require("./shift.router")
module.exports =(app)=>{
    const PATH_ADMIN=systemconfig.prefixAdmin;
    app.use(`${PATH_ADMIN}/Account`,admin_router);
    app.use(`${PATH_ADMIN}/Department`, Department_router);
    app.use(`${PATH_ADMIN}/Shift`, shift_router);
}