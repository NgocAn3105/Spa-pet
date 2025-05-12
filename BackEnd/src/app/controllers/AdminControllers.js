const e = require('express');
const AdminModel = require('../model/Adminmodels'); // Kiểm tra lại đường dẫn file model

class AdminControllers {
    async add_service(req, res) {
        try {
            const { name, price, description } = req.body;
            if (!name || !price || !description) {
                return res.json({
                    "status": 404,
                    "message": "Missing something!"
                })
            }
            const service = await AdminModel.add_services(name, price, description);

            return res.json({
                "respone": service
            })
        } catch (e) {
            return res.json({
                "status": 500,
                "message": "Error : " + e
            });
        }
    }


    async add_employee(req, res) {
        try {
            const { account_employee_id, password } = req.body;
            if (!account_employee_id || !password)
                return res.json({
                    'status': 404,
                    "message": "missing infomation !"
                });
            if (!account_employee_id.lenght == 7 || !password.lenght == 4) {
                return res.json({
                    'status': 404,
                    "message": "Wrong parttern sign employee !"
                });
            }
            const employee = await AdminModel.SignEmployee(account_employee_id, password);
            return res.json({
                employee
            })
        } catch (e) {
            return res.json({
                "status": 500,
                "message": "something wrong ~ " + e
            });
        }
    }

    // lay thong tin nhan vien
    async get_employee(req, res) {
        try {
            const employee = await AdminModel.getEmployee();

            return res.json({
                employee
            })

        } catch (e) {
            return res.json({
                "status": 500,
                "message": "something wrong ~ " + e
            });
        }
    }
    // thong tin theo id
    async get_employee_id(req, res) {
        try {
            const { employee_id } = req.body;
            const employee = await AdminModel.getEmployeeId(employee_id);

            return res.json({
                employee
            })

        } catch (e) {
            return res.json({
                "status": 500,
                "message": "something wrong ~ " + e
            });
        }
    }

    async Delete_employee(req, res) {
        try {
            const { employee_id } = req.body;
            if (!employee_id) {
                return res.status(400).json({

                    "response": "Wrong id !"
                })
            }
            const employee = await AdminModel.RemoveEmployee(employee_id);
            if ((await employee).message.status == 200) {

                return res.status(200).json({
                    employee
                })
            } else {
                return res.status(400).json({
                    employee
                })
            }

        } catch (e) {
            return res.json({
                "status": 500,
                "message": "something wrong ~ " + e
            });
        }
    }


    async UpdateEmployee(req, res) {
        try {
            const { first_name, last_name, email, address, phone, role, employee_id, img } = req.body;

            if (!employee_id) {
                return res.status(400).json({ message: "id is required!" });
            }

            const updatedUser = await AdminModel.UpdateEmployee(first_name, last_name, email, address, phone, role, employee_id, img || null);

            return res.json({
                "message": updatedUser
            })
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: "Something went wrong ~ " + e
            });
        }
    }
    // upload anh
    async UploadImgEmployee(req, res) {
        const { employee_id } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'Chưa chọn ảnh!' });
        }
        const img_path = `${req.file.filename}`;
        const img = await AdminModel.uploadimg_employee(img_path, employee_id);

        return res.json({ img, img_path });
    }


}

module.exports = new AdminControllers();
