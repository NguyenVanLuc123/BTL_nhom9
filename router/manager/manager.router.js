const express = require('express');
const multer = require('multer')
const router=  express.Router();
const controller_login=require("../../controller/manager/manager.controller")
const upload = multer()
const validate=require("../../validate/admin/Account.valaidate")
const uploadCloud =require("../../middleware/admin/UpLoadOnCloud_middleware")
router.get("/",controller_login.someOtherPage)
router.patch("/edit/:MaP",upload.single('image'),uploadCloud.upload,controller_login.editPatch)
router.delete("/deleted/:Manv/:MaP",controller_login.deleted)
router.post("/CreatAccount/:MaP",upload.single('image'),uploadCloud.upload,validate.createAccount,controller_login.CreatAccountPost)
module.exports=router;