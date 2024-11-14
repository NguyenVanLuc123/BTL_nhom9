const express = require('express');
const router=  express.Router();
const controller=require("../../controller/admin/login.controller");

router.post("/",controller.dataLoginClient);

module.exports=router