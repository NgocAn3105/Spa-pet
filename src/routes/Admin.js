const express = require('express');
const router = express.Router();

const Admincontrolers = require('../app/Controllers/AdminControllers');

const helpersControllers = require('../app/helpers/helpersControllers')


//them dich vu [post]
router.post("/add-service", Admincontrolers.add_service);
//them nhan vien
router.post("/employee-add", Admincontrolers.add_employee);
//lay thong tin nhan vien[get]
router.get("/employee-info", Admincontrolers.get_employee);
//xoa nhan vien[delete]
router.delete("/employee-remove", Admincontrolers.Delete_employee);
// sua nhan vien [put]
router.put("/employee-update", Admincontrolers.UpdateEmployee);
// lay thong tin lich kham ma khach hang dang ky
router.post("/info-register-form", helpersControllers.info_resgister_form);
// lich su thong tin kham cua pet tim bang so dien thoai customer
router.post("/history-pets/Customer-phone", helpersControllers.History_customer_pet_byphone);





module.exports = router;