const express=require('express');
const newUser=require('./Users')
const newAdmin = require('./Admin')
const newEmployee =require('./Employee')
function route(app){
    app.use('/users',newUser);
    app.use('/Admin',newAdmin);
    app.use('/Admin/employee',newEmployee);
    app.get('/',(req,res)=>res.send("hello"));
   
    
}
module.exports=route;