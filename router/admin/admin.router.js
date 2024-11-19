const express = require('express');
const multer = require('multer')
const router=  express.Router();
const controller=require("../../controller/admin/admin.controller")
const validate=require("../../validate/admin/Account.valaidate")
const upload = multer()
const uploadCloud =require("../../middleware/admin/UpLoadOnCloud_middleware")
router.get("/",controller.trangchu)

router.patch("/edit/:Manv",upload.single('image'),uploadCloud.upload,controller.editPatch)
router.delete("/deleted/:Manv",controller.deleted)

router.post("/CreatAccount/:MaP", upload.single('image'),uploadCloud.upload,validate.createAccount,controller.CreatAccountPost)
module.exports=router

