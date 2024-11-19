const express = require('express');
const router=  express.Router();
const controller=require("../../controller/manager/timekeeping.controller");

router.get("/",controller.trangchu);

module.exports=router