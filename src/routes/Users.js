const express = require("express");
const router = express.Router();

const UsersControllers = require('../app/controllers/UsersControllers')

//dat hen 
router.post('/register_form', UsersControllers.Visit_form);

//them thu cung 
router.post('/add-pet', UsersControllers.add_pet);
//doi password user [put]
router.put('/update-password', UsersControllers.Update_Password);
//thay doi thong tin user [put]
router.put('/update-user', UsersControllers.UpdateUser);
//dang ky 
router.post('/signin', UsersControllers.Signin);
// dang nhap
router.post('/login', UsersControllers.Login);
//hien thi thong tin  
router.post('/info-users', UsersControllers.getUsers);
//
router.post('/History/customer-pet', UsersControllers.History_pet_byIDCustomer);


module.exports = router;