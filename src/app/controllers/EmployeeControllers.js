const EmmployeeModel = require('../model/EmployeeModels');

class Employeecontrolers {
    async create_visit(req, res) {
        try {
            const { date, notes, customer_id, pet_id, employee_id, services } = req.body;
            const create_visit = await EmmployeeModel.Form_visit(date, notes, customer_id, pet_id, employee_id, services);
            return res.json({
                respone: create_visit
            })
        } catch (error) {
            return res.status(500).json({ message: "Error: " + error });
        }

    }

    async Update_visit_status(req, res) {
        try {
            const { status, appointment_id } = req.body;
            const UpdateVisitStatus = await EmmployeeModel.Update_visit_status(status, appointment_id);
            return res.json({ response: UpdateVisitStatus })
        } catch (e) {
            return res.json({ response: "error " + e })
        }
    }


    async Info_visit_by_user(req, res) {
        const { customer_id, pet_id } = req.body;
        const info_visit = await EmmployeeModel.Info_visit_by_user(customer_id, pet_id);
        return res.json({ info_visit });
    }


    async Login_employee(req, res) {
        const { account_employee_id, password } = req.body;

        const employee = await EmmployeeModel.Login_employee(account_employee_id, password);
        return res.json({ employee })
    }

    async Info_employee(req, res) {
        const { account_employee_id } = req.body;
        const employee = await EmmployeeModel.Info_employee(account_employee_id);
        return res.json({ employee });
    }
}

module.exports = new Employeecontrolers();