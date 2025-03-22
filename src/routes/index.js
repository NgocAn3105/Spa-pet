const newUser=require('./Users')
const newAdmin = require('./Admin')
const newEmployee =require('./Employee')
function route(app){
    app.use('/users',newUser);
    app.use('/Admin',newAdmin);
    app.use('/Admin/employee',newEmployee);
    app.use('/',(req,res)=>res.send("xin chao "));
}
module.exports=route;