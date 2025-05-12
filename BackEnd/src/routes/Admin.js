const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Admincontrolers = require('../app/Controllers/AdminControllers');

const helpersControllers = require('../app/helpers/helpersControllers')


//them dich vu [post]
router.post("/add-service", Admincontrolers.add_service);
//them nhan vien
router.post("/employee-add", Admincontrolers.add_employee);
//lay thong tin nhan vien[get]
router.get("/employee-info", Admincontrolers.get_employee);
//lay thong tin by id
router.post("/employee-info-id", Admincontrolers.get_employee_id);

//xoa nhan vien[delete]
router.delete("/employee-remove", Admincontrolers.Delete_employee);
// sua nhan vien [put]
router.put("/employee-update", Admincontrolers.UpdateEmployee);
/////////////////////////
// lay thong tin lich kham ma khach hang dang ky
router.post("/info-register-form", helpersControllers.info_resgister_form);

// update thong tin lich kham ma khach hang dang ky
router.post("/info-register-form/update", helpersControllers.info_resgister_form_update);
/////////////////////////////


// lich su thong tin kham cua pet tim bang so dien thoai customer
router.post("/history-pets/Customer-phone", helpersControllers.History_customer_pet_byphone);

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

router.post('/upload-img', upload.single('image'), Admincontrolers.UploadImgEmployee);


router.get('/getImg/:imageName', (req, res) => {
    const imagePath = path.join(uploadDir, req.params.imageName);
    res.sendFile(imagePath);
});




module.exports = router;