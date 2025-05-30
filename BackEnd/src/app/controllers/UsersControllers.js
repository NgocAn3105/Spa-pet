const { response } = require('express');
const usersModel = require('../model/Usersmodels');
const sendMail = require("../modifie/Mail");
const UsersModel = require('../model/Usersmodels');
const jwt = require('jsonwebtoken');

class UsersControllers {
    //xu ly token
    authenticateJWT(req, res, next) {
        // Lấy token từ header 'Authorization'
        const token = req.header('Authorization')?.replace('Bearer ', '');

        // Nếu không có token, trả về lỗi
        if (!token) {
            return res.status(403).json({ message: "Access denied, no token provided!" });
        }

        // Xác thực và giải mã token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "Invalid token!" });
            }
            // Lưu thông tin người dùng giải mã được từ token vào req.user
            req.user = decoded;
            next();  // Tiếp tục xử lý các route tiếp theo
        });
    };

    async getUsers(req, res) {
        try {
            const { user } = req.user;
            const users = await usersModel.GetInfoUser(user.email);
            if (users.status != 200) return res.status(404).json({ users });
            return res.json({ users })
        } catch (e) {
            return res.status(500).json({ "error": "Lỗi máy chủ!" + e });
        }
    }
    async Signin(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                return res.json({
                    'status': 422,
                    "message": "can't find email or password !"
                });
            const user = await usersModel.SignUser(email, password);
            return res.json({
                "message": user
            })
        } catch (e) {
            return res.json({
                "status": 500,
                "message": "something wrong ~ " + e
            });
        }
    }

    async Login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ "error": "Thiếu thông tin đăng nhập!" });
            }

            const user = await usersModel.getNameUsers(email, password);
            return res.json({ user })
        } catch (e) {
            return res.status(500).json({ "error": "Lỗi máy chủ!" + e });
        }
    }

    async UpdateUser(req, res) {
        try {
            const { first_name, last_name, email, address, phone } = req.body;

            if (!email) {
                return res.status(400).json({ message: "Email is required!" });
            }

            const updatedUser = await usersModel.Update_User(first_name, last_name, email, address, phone);

            if (updatedUser.status === 400) {
                return res.status(400).json({ message: updatedUser.message });
            }

            return res.json({
                "response": updatedUser
            })
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: "Something went wrong ~ " + e
            });
        }
    }
    async Update_Password(req, res) {
        try {
            const { email, password } = req.body;
            if (!email) {
                return res.status(400).json({ message: "Email is required!" });
            }
            const change_password = await usersModel.Update_Password(email, password);
            return res.json({
                "response": change_password
            });
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: "Something went wrong ~ " + e
            });
        }
    }


    async add_pet(req, res) {
        try {
            const { name, breed, age, customer_id } = req.body;
            if (!name || !breed || !age || !customer_id) {
                return res.status(400).json({ message: "missing infomation!" });
            }
            const pet = await usersModel.add_pet(name, breed, age, customer_id);
            return res.json({ "response": pet });


        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: "Something went wrong ~ " + e
            });
        }
    }
    // dang ky lich kham
    async Visit_form(req, res) {
        try {
            const { appointment_date, customer_id, employee_id, hours } = req.body;

            // Kiểm tra nếu có trường nào bị thiếu
            if (!appointment_date || !customer_id || !employee_id) {
                return res.status(400).json({ message: "Missing required fields!" });
            }

            // Chuyển đổi ngày & thiết lập thời gian so sánh
            const inputDate = new Date(appointment_date);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Đặt giờ về 00:00 để so sánh chính xác ngày

            // Kiểm tra ngày hợp lệ (ngày phải >= hôm nay)
            if (inputDate < today) {
                return res.status(400).json({ message: "Date must be today or later!" });
            }

            // Nếu ngày là hôm nay, kiểm tra giờ
            if (inputDate.getTime() === today.getTime()) {
                if (hours === undefined) {
                    return res.status(400).json({ message: "Hours is required for today's appointment!" });
                }

                const currentHour = new Date().getHours();
                const inputHour = parseInt(hours, 10);

                if (inputHour < currentHour) {
                    return res.status(400).json({ message: "Hours must be greater than or equal to the current hour!" });
                }
            }


            const visit = await usersModel.Visit_form(appointment_date, customer_id, employee_id, hours);
            if (visit.status != 200) {
                return res.json({ response: visit });
            }

            const user = await usersModel.getUserByID(customer_id);
            try {
                await sendMail.sendMail(user.email);
                return res.json({ status: 200, message: "email sent!", visit: visit });
            } catch (emailError) {
                console.error("Error sending email:", emailError);
                return res.json({ status: 500, message: "Appointment created, but failed to send email!" });
            }


        } catch (error) {
            return res.status(500).json({ message: "Server Error: " + error.message });
        }
    }

    // xem lich su kham cua thu cung 
    async History_pet_byIDCustomer(req, res) {
        const { user } = req.user;
        const pets = await UsersModel.History_pet_byIDCustomer(user.customer_id);
        return res.json({ pets })
    }





}

module.exports = new UsersControllers