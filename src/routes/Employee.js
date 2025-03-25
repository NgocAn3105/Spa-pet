const express=require('express');
const router=express.Router();

const Employeecontrolers=require('../app/Controllers/EmployeeControllers');

router.post("/visit_form",Employeecontrolers.create_visit);
router.post("/visit_form_update_status",Employeecontrolers.Update_visit_status);


module.exports=router;