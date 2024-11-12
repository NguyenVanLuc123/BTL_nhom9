const express = require('express');
const router=  express.Router();
const controller=require("../../controller/admin/admin.controller")
const validate=require("../../validate/admin/Account.valaidate")
router.get("/",controller.trangchu)
router.get("/edit/:Manv",controller.editGet)
router.patch("/edit/:Manv",controller.editPatch)
router.delete("/deleted/:Manv",controller.deleted)
router.get("/CreatAccount/:MaP",controller.CreatAccountGet)
router.post("/CreatAccount/:MaP",validate.createAccount,controller.CreatAccountPost)

module.exports=router

