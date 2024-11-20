const express = require('express');
const multer = require('multer')
const router=  express.Router();
const controller=require("../../controller/admin/admin.controller")
const validate=require("../../validate/admin/Account.valaidate")
const upload = multer()
const uploadCloud =require("../../middleware/admin/UpLoadOnCloud_middleware")
const requireAuth=require("../../middleware/admin/CheckAccount")
router.get("/",requireAuth.requireAuth,controller.trangchu)

router.patch("/edit/:Manv",requireAuth.requireAuth,upload.single('image'),uploadCloud.upload,controller.editPatch)
router.delete("/deleted/:Manv",requireAuth.requireAuth,controller.deleted)
router.get('/logout',controller.logout)
router.post("/CreatAccount/:MaP", upload.single('image'),requireAuth.requireAuth,uploadCloud.upload,validate.createAccount,controller.CreatAccountPost)
module.exports=router

