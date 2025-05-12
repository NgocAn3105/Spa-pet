const e = require('express');
const db = require('./database');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

class UsersModel {



    // Kiểm tra xem có giá trị không

    static async GetInfoUser(email) {
        const [rows] = await db.query("SELECT * FROM customer as c join account as ac on c.id=ac.customer_id where ac.email=?", [email]);
        if (rows.length === 0) { return { status: 404, message: "Not Found User!" } }
        return { status: 200, message: rows };
    }
    static async getNameUsers(email, pass) {
        // Lấy user theo email
        const [rows] = await db.query("SELECT * FROM account WHERE email=?", [email]);

        if (rows.length === 0) return { status: 404, message: "Not Found User!" }

        const user = rows[0];

        // So sánh mật khẩu nhập vào với hash trong DB
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) return { status: 401, message: "Wrong Password!" }
        console.log(process.env.JWT_SECRET);
        // Tạo token
        const token = jwt.sign(
            { user: { user } },   // hoặc payload tùy bạn
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        return {
            status: 200,
            message: {
                user: user,
                token: token
            }
        };
    }
    static async getUserByID(customer_id) {
        const [rows] = await db.query("SELECT email FROM account where customer_id=?", [customer_id]);
        return rows[0];

    }

    static async SignUser(email, password) {
        // tao user rong trong customer
        const [rows] = await db.query("SELECT email FROM account WHERE email=?", [email]);

        if (rows.length == 0) {
            const [result] = await db.query(
                "insert into customer (first_name, last_name, address, phone) values (null,null,null,null)"
            );
            const customer_id = result.insertId;
            const pass = await bcrypt.hash(password, 10);
            await db.query("insert into account (customer_id,email,password) values(?,?,?) ", [customer_id, email, pass]);
            return { status: 200, message: "User add successfully!" };


        } else {
            return { status: 404, message: "Exists email !" }
        }

    }

    static async Update_User(first_name, last_name, email, address, phone) {
        // Kiểm tra xem email có tồn tại không
        const [result] = await db.query("SELECT customer_id FROM account WHERE email=?", [email]);

        if (result.length === 0) {
            return { status: 400, message: "Email not found!" };
        }
        const customer_id = result[0].customer_id;
        console.log(result[0])
        // Thực hiện UPDATE thay vì INSERT
        await db.query(
            "UPDATE customer SET first_name=?, last_name=?, address=?, phone=? WHERE id=?",
            [first_name || null, last_name || null, address || null, phone || null, customer_id]
        );

        return { status: 200, message: "User updated successfully!" };
    }

    static async Update_Password(email, password) {
        const [rows] = await db.query("SELECT customer_id FROM account WHERE email=?", [email]);

        if (rows.length === 0) {
            return { status: 400, message: "Email not found!" };
        }
        const pass = await bcrypt.hash(password, 10);
        await db.query(
            "UPDATE account SET password=? WHERE customer_id=?",
            [pass, rows[0].customer_id]
        );

        return { status: 200, message: "password updated successfully!" };
    }

    static async add_pet(name, breed, age, customer_id) {
        const [rows] = await db.query("select id from customer where id=?",
            [customer_id]
        );
        if (rows.length === 0) {
            return { status: 400, message: "not find customer!" };
        }
        await db.query("insert into pet (name,breed,age,customer_id) values(?,?,?,?)",
            [name, breed, age, customer_id]
        )
        return { status: 200, message: "add pet successfully!" };
    }

    // dang ky lich kham
    static async Visit_form(appointment_date, customer_id, employee_id, hours) {
        try {
            // kiem tra xem co trung ngay kham gio kham cua 1 nhan vien hay khong ?
            const [existingAppointments] = await db.query(
                `SELECT a.appointment_date, a.hours, ae.employee_id 
                 FROM appointment AS a 
                 JOIN appointment_staff AS ae ON a.id = ae.appointment_id 
                 WHERE a.appointment_date = ? AND a.hours = ? AND ae.employee_id = ?`,
                [appointment_date, hours, employee_id]
            );
            // trung thi khong nhap
            if (existingAppointments.length > 0) {
                return { status: 400, message: "Employee already has an appointment at this time!" };
            }

            //  khong trung thi xu ly 
            const [appointment] = await db.query(
                "INSERT INTO appointment (appointment_date, hours) VALUES (?, ?)",
                [appointment_date, hours]
            );
            var appointment_id = appointment.insertId;
            await db.query(
                "INSERT INTO registration_form (appointment_date, hours, customer_id, appointment_id) VALUES (?, ?, ?, ?)",
                [appointment_date, hours, customer_id, appointment_id]
            );

            await db.query(
                "INSERT INTO appointment_staff (appointment_id, employee_id) VALUES (?, ?)",
                [appointment_id, employee_id]
            );

            return { status: 200, message: "Appointment created successfully!" };

        } catch (error) {
            return { status: 500, message: "Error: " + error };
        }
    }

    static async History_pet_byIDCustomer(customer_id) {
        try {

            const [pets] = await db.query(`
                SELECT c.last_name as Customer , p.id as IdPet,p.name as Pet , v.date , s.name as service
                FROM
                    customer as c 
                    JOIN
                        pet as p on p.customer_id = c.id
                    JOIN
                        visit as v on v.customer_id=c.id
                    LEFT JOIN
                        visit_service as vs on vs.visit_id = v.id
                    LEFT join 
                        service as s on s.id = vs.service_id
                    WHERE
                        c.id=?
            `, [customer_id]);
            if (pets.length === 0) return { status: 404, message: "Not found any pets !" }
            return { status: 200, message: pets }
        } catch (error) {
            return { status: 500, message: "Error: " + error };
        }

    }




}
module.exports = UsersModel