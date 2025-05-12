const db = require('./database');

class EmployeeModel {
    //////////////////////////////////////// 
    // Quyen Cua Nhan Vien
    static async Form_visit(date, notes, customer_id, pet_id, employee_id, services) {
        try {

            const [customer] = await db.query(`
                select c.id as id
                from account ac 
                join customer c on ac.customer_id =c.id 
                join pet p on c.id =p.customer_id
                 WHERE c.id=? and p.id=?
                 `,
                [customer_id, pet_id]);

            if (customer.length === 0) return { status: 404, message: "Not found Customer !" }

            const [visit] = await db.query("insert into visit (date,notes,customer_id,pet_id,employee_id) values(?,?,?,?,?)",
                [date, notes, customer_id, pet_id, employee_id]
            );
            const visit_id = visit.insertId;
            const add_Service = services.map(async (service) => {
                await db.query("insert into visit_service (visit_id,service_id) values(?,?) ", [visit_id, service])
            })
            await Promise.all(add_Service);


            return { status: 200, message: "Successful update Visit ! " };

        } catch (e) {
            return { status: 500, message: "error " + e };
        }


    }

    static async test() {
        const [customer] = await db.query(`
                select c.id as customer_id
                from account ac 
                join customer c on ac.customer_id =c.id 
                join pet p on c.id =p.customer_id
                 WHERE c.phone=0924456712

        `)
        return { status: 200, message: customer[0].customer_id }
    }
    static async Update_visit_status(status, appointment_id) {
        try {

            await db.query("update appointment set status=? where id=? ", [status, appointment_id])
            return { status: 200, message: "Update Status Success !" }


        } catch (E) {
            return {
                status: 500,
                message: "error " + E
            }
        }

    }


    static async Info_visit_by_user(customer_id, pet_id) {
        try {
            const [info] = await db.query(`
                select c.last_name as customer, p.name as 'NamePet' , p.breed , v.date , s.name
                from 
                visit as v 
                JOIN 
                    customer as c on c.id=v.customer_id
                join 
                    pet as p on p.id=v.pet_id
                JOIN
                    visit_service as vs on vs.visit_id=v.id
                LEFT JOIN
                    service as s on s.id=vs.service_id
                where 
                    c.id=? and p.id=?
         `, [customer_id, pet_id]);
            if (info.length === 0) return { status: 404, message: " This User Not Have Visit !" };
            return { status: 200, message: info };
        } catch (e) {
            return { status: 500, message: "Error " + e };
        }
    }

    //dang nhap cua nhan vien
    static async Login_employee(account_employee_id, password) {
        const [employee] = await db.query("select * from account_employee where  account_employee_id=? and password=?", [account_employee_id, password]);
        if (employee.length === 0) return { status: 404, message: "not found employee!" }
        return { status: 200, message: "Login Successful !" };
    }
    // lay thong tin full cua nhan vien 
    static async Info_employee(account_employee_id) {
        const [employee] = await db.query(`select employee.* from 
        employee join account_employee on employee.id=account_employee.employee_id
        where account_employee.account_employee_id=?`, [account_employee_id]);
        if (employee.length === 0) return { status: 404, message: "not found employee!" }
        return { status: 200, message: employee };
    }

    static async Info_services() {
        const [services] = await db.query("select * from service");
        return { status: 200, message: services }
    }

    static async GetList_Customer_By_phone(phone) {
        const [customers] = await db.query(`
            select *
            from customer 
            where phone = ?
            `, [phone]);
        if (customers.length === 0) return { status: 404, message: "Not found Customer!" };
        return { status: 200, message: customers };
    }
    static async GetList_Pets_By_customerid(customer_id) {
        const [customers] = await db.query(`
            select *
            from pet
            where customer_id = ?
            `, [customer_id]);
        if (customers.length === 0) return { status: 404, message: "Not found pets!" };
        return { status: 200, message: customers };
    }

}


module.exports = EmployeeModel;