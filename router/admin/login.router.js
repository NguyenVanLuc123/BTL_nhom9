const express = require('express');
const router=  express.Router();
const controller=require("../../controller/admin/login.controller");

router.get("/",controller.loginAdmin);
router.post("/",controller.loginAdminPost)
module.exports=router