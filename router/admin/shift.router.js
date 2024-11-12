const express = require('express');
const router=  express.Router();
const controller=require("../../controller/admin/shift.controller")
const validate=require("../../validate/admin/Shift.validate")
router.get("/",controller.trangchu)
router.get("/CreatShift",controller.CreatShiftGet)
router.post("/CreatShift",validate.createShift,controller.CreatShiftPost )
router.get("/edit/:MaC",controller.editGet)
router.patch("/edit/:MaC",controller.editPatch)
router.delete("/deleted/:MaC",controller.deleted)
module.exports=router