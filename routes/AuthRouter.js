const express=require('express');
const AuthController = require('../app/controller/AuthController');

const Router=express.Router()


Router.post('/admin/register',AuthController.register)
Router.post('/admin/login',AuthController.login)






module.exports=Router