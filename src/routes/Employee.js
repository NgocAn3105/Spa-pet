const express = require('express');
const router = express.Router();

const Employeecontrolers = require('../app/Controllers/EmployeeControllers');
const helpersControllers = require('../app/helpers/helpersControllers')

router.post("/visit_form", Employeecontrolers.create_visit);
router.post("/visit_form_update_status", Employeecontrolers.Update_visit_status);
router.post("/visit_form/info", Employeecontrolers.Info_visit_by_user);
// login nhan vien
router.post("/employee-login", Employeecontrolers.Login_employee);
//thong tin nhan vien
router.post("/employee-info", Employeecontrolers.Info_employee);
// lay thong tin lich kham ma khach hang dang ky
router.post("/info-register-form", helpersControllers.info_resgister_form);
// lich su thong tin kham cua pet tim bang so dien thoai customer
router.post("/history-pets/Customer-phone", helpersControllers.History_customer_pet_byphone);

module.exports = router;