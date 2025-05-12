const db = require('./database');

class AdminModel {
    //dang ky dich vu [post]
    static async add_services(name, price, description) {
        const [services] = await db.query("select * from service where name =?",
            [name]
        )
        if (services > 0) {
            return { "status": 404, "message": "exists service in system" };
        }
        await db.query("insert into service (name,price,description) values (?,?,?)",
            [name, price, description]
        )
        return { status: 200, "message": "Successful add service succesful" }

    }

    // quyen chinh sua nhan vien 

    // Dang ky nhan vien [post]
    static async SignEmployee(account_employee_id, password) {
        const [rows] = await db.query("SELECT account_employee_id FROM account_employee WHERE account_employee_id=?",
            [account_employee_id]);

        if (rows.length == 0) {
            const [result] = await db.query(
                "insert into employee (first_name, last_name,email, address, phone,role,img) values (null,null,null,null,null,'doctor','')"
            );
            const employee_id = result.insertId;

            await db.query("insert into account_employee (account_employee_id,employee_id,password) values(?,?,?) ",
                [account_employee_id, employee_id, password]);
            return { status: 200, message: "Employee add successfully!" };


        } else {
            return { status: 404, message: "Exists employee !" }
        }
    }
    // lay full nhan vien [get]
    static async getEmployee() {
        const [Employee] = await db.query("select * from employee");
        if (Employee == 0) {
            return { status: 404, message: "Doesn't have employee , add more employee please !" };
        }
        return { status: 200, message: Employee }
    }
    // lay nhan vien theo id [post]
    static async getEmployeeId(employee_id) {
        const [Employee] = await db.query("select * from employee where id=?", [employee_id]);
        if (Employee == 0) {
            return { status: 404, message: "Doesn't have employee , add more employee please !" };
        }
        return { status: 200, message: Employee }
    }
    // xoa nhan vien [del]
    static async RemoveEmployee(employee_id) {
        try {

            const [employee] = await db.query("select id from employee where id =? ", [employee_id]);
            if (employee.length === 0) return { status: 404, message: "not found employee" };
            await db.query("update employee set role = 'quit' where id =? ", [employee_id])

            return { status: 200, message: "Delete Succesful !" };

        } catch (e) {
            return { status: 500, message: "Error " + e };
        }
    }

    // sửa thông tin nhân viên [put]
    static async UpdateEmployee(first_name, last_name, email, address, phone, role, employee_id, img) {
        try {
            // Tạo đối tượng params với điều kiện img có giá trị
            let params = [first_name || null, last_name || null, email || null, address || null, phone || null, role, employee_id];

            // Nếu có img thì thêm img vào params
            if (img) {
                params.splice(6, 0, img); // Thêm img vào vị trí đúng trong query
            } else {
                params.splice(6, 0, null); // Nếu không có img thì truyền null
            }

            // Chạy query
            await db.query(
                "UPDATE employee SET first_name=?, last_name=?, email=?, address=?, phone=?, role=?, img=? WHERE id=?",
                params
            );

            return { status: 200, message: "employee updated successfully!" };
        } catch (e) {
            console.error("Error updating employee: ", e);
            throw new Error("Error updating employee data.");
        }
    }


    static async uploadimg_employee(img_path, employee_id) {
        const [img] = await db.query("update employee set img=?  where id=?", [img_path, employee_id]);
        if (img.affectedRows === 0) return { status: 400, message: "Cant Upload images!" };
        return { status: 200, message: "Upload Sucsess!" };
    }





}

module.exports = AdminModel;
