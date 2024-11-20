const express = require('express');
const router=  express.Router();
const controller=require("../../controller/admin/department.controller")
const validate=require("../../validate/admin/Department.validate")
const requireAuth=require("../../middleware/admin/CheckAccount")
router.get("/",requireAuth.requireAuth,controller.trangchu)
router.get("/CreatDepartment",controller.CreatDepartmentGet)
router.post("/CreatDepartment",validate.createDepartment,controller.CreatDepartmentPost)
router.delete("/deleted/:MaP",controller.deleted)
module.exports=router