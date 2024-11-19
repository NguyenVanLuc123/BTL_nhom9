const systemconfig= require('../../config/system')
const manager_router=require("./manager.router");
const timekeeping_router= require("./timekeeping.router")
module.exports =(app)=>{

    const prefixManager=systemconfig.prefixManager;
    app.use(`${prefixManager}/Account`,manager_router);
    app.use(`${prefixManager}/timekeeping`, timekeeping_router);
}