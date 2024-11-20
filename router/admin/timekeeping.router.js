const express = require('express');
const router=  express.Router();
const controller=require("../../controller/admin/timekeeping.controller");
const requireAuth=require("../../middleware/admin/CheckAccount")
router.get("/",requireAuth.requireAuth,controller.trangchu);

module.exports=router