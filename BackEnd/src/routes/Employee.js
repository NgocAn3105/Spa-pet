const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Employeecontrolers = require('../app/Controllers/EmployeeControllers');
const helpersControllers = require('../app/helpers/helpersControllers')

router.get("/test", Employeecontrolers.test);


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
//lay thong tin service
router.get("/info-services", Employeecontrolers.Info_service);
//thong tin cua nhan vien ,pet
router.post("/info-customer", Employeecontrolers.List_Customer_By_phone);
router.post("/info-pet", Employeecontrolers.List_Pets_By_customerid);
//upload
const uploadDir = path.join(__dirname, "..", 'app', 'upload');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), helpersControllers.UploadImg);


router.get('/getImg/:imageName', (req, res) => {
    const imagePath = path.join(uploadDir, req.params.imageName);
    res.sendFile(imagePath);
}

);
module.exports = router;