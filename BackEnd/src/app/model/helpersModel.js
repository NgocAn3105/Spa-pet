const db = require('./database');
class helpersModel {
    static async Info_register_form(appointment_date) {
        try {
            const [register_form] = await db.query(`
            select a.id ,a.appointment_date as date , a.hours,concat(c.last_name ," ", c.first_name) as NameCustomer , c.phone, e.id as IdDocTor, concat(e.last_name," ",e.first_name) as doctor ,a.status
            from 
                appointment as a 
                JOIN
                    registration_form as rf on a.id= rf.appointment_id
                LEFT JOIN
                    customer as c on c.id = rf.customer_id
                JOIN
                    appointment_staff as  aps on aps.appointment_id=a.id
                LEFT JOIN
                    employee as e on e.id = aps.employee_id
                where 
                    a.status is Null and a.appointment_date = ? 
                ORDER BY a.hours ASC
    `, [appointment_date]);
            if (register_form.length === 0) return { status: 404, message: "Haven't Register form !" };

            return { status: 200, message: register_form }
        } catch (e) {
            return { status: 500, message: "Error " + e };
        }
    }
    static async Info_register_formUpdate(appointment_id) {
        try {
            const [update] = await db.query("select status from appointment where id = ? ", [appointment_id]);
            if (update.length === 0) return { status: 404, message: "Not Found appoinment!" };

            await db.query("update appointment set status = 'done' where id = ? ", [appointment_id]);
            return { status: 200, message: "update succsesful !" };
        } catch (error) {
            return {
                status: 500, message: "Error " + error
            };
        }
    }

    static async History_Customer_pet_byPhone(phone) {
        try {
            const [pets] = await db.query(`
                SELECT c.last_name as Customer , p.id as IdPet,p.name as Pet ,date(v.date) as date  
                , time(v.date) as time, s.name as service
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
                        c.phone=?
                `, [phone]);
            return { status: 200, message: pets }
        }
        catch (e) {
            return { status: 500, message: "Error " + e };

        }
    }
    static async uploadImg(img_path, customer_id) {
        const [img] = await db.query("update customer set image=?  where id=?", [img_path, customer_id]);
        if (img.affectedRows === 0) return { status: 400, message: "Cant Upload images!" };
        return { status: 200, message: "Upload Sucsess!" };
    }

}

module.exports = helpersModel;