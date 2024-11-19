const express = require('express');
const router=  express.Router();
const controller=require("../../controller/admin/timekeeping.controller");

router.get("/",controller.trangchu);

module.exports=router