const express=require('express');
const router=express.Router();

const Admincontrolers=require('../app/Controllers/AdminControllers');



//them dich vu [post]
router.post("/add-service",Admincontrolers.add_service);
//them nhan vien
router.post("/employee-add",Admincontrolers.add_employee);
//lay thong tin nhan vien[get]
router.get("/employee-info",Admincontrolers.get_employee);
//xoa nhan vien[delete]
router.delete("/employee-remove",Admincontrolers.Delete_employee);
// sua nhan vien [put]
router.put("/employee-update",Admincontrolers.UpdateEmployee);




module.exports=router;