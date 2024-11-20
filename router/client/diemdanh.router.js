const express = require('express');
const router=  express.Router();
const controller=require("../../controller/client/diemdanh.controller");

router.post("/",controller.diemdanh);

module.exports=router