const systemconfig= require("../../config/system")
const admin_router=require("./admin.router")
const Department_router=require("./department.router")
const shift_router=require("./shift.router")
const login_router=require("./login.router")
const timekeeping_router= require("./timekeeping.router")
module.exports =(app)=>{
    const PATH_ADMIN=systemconfig.prefixAdmin;
    app.use(`${PATH_ADMIN}/Account`,admin_router);
    app.use(`${PATH_ADMIN}/Department`, Department_router);
    app.use(`${PATH_ADMIN}/Shift`, shift_router);
    app.use(`${PATH_ADMIN}/login`, login_router);
    app.use(`${PATH_ADMIN}/timekeeping`, timekeeping_router);
}