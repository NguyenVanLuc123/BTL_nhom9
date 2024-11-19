const login_router=require("./login.router")
module.exports =(app)=>{
   app.use("/login",login_router)
}