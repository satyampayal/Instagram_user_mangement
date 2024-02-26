const express=require('express')
const Router=express.Router();
const {login,register,userInfo}=require('../controller/userController');
const authenticateUser=require('../middleware/authenticate');

Router.post('/register',register);
Router.post('/login',login);
Router.get('/',authenticateUser,userInfo);

module.exports=Router;