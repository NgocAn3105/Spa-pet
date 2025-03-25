const AdminModel = require('../model/Adminmodels');

class Employeecontrolers{
    async create_visit(req,res){
        try {
            const { date, notes, customer_id, pet_id, employee_id, services } = req.body;
            const create_visit=await AdminModel.Form_visit(date, notes, customer_id, pet_id, employee_id, services );
            return res.json({
                respone:create_visit
            })
        } catch (error) {
            return res.status(500).json({ message: "Error: " + error });
        }
    
    }

    async Update_visit_status(req,res){
        try{
            const{status,appointment_id}=req.body;
            const UpdateVisitStatus=await AdminModel.Update_visit_status(status,appointment_id);
            return res.json({response:UpdateVisitStatus})
        }catch(e){
            return res.json({response:"error "+e})
        }
    }
}

module.exports=new Employeecontrolers();