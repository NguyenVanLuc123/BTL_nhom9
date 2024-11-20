const login_router=require("./login.router")
const diemdanh_router= require('./diemdanh.router')
module.exports =(app)=>{
   app.use("/login",login_router)
   app.use("/diemdanh",diemdanh_router)
}