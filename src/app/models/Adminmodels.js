const db=require('./database');

class AdminModel{
    //dang ky dich vu [post]
    static async add_services(name,price,description){
            const [services] = await db.query("select * from service where name =?",
                [name]
            )
            if(services > 0 ){
                return {"status":404,"message":"exists service in system"};
            }
            await db.query("insert into service (name,price,description) values (?,?,?)",
                [name,price,description]
            )
            return {status:200 ,"message": "Successful add service succesful"}
        
    }

    // quyen chinh sua nhan vien 

    // Dang ky nhan vien [post]
    static async SignEmployee(account_employee_id,password){
        const [rows] = await db.query("SELECT account_employee_id FROM account_employee WHERE account_employee_id=?", 
            [account_employee_id]);
    
            if (rows.length == 0) {
            const [result]=  await db.query(
                "insert into employee (first_name, last_name,email, address, phone,role) values (null,null,null,null,null,'doctor')"
              );
            const employee_id=result.insertId;

            await db.query("insert into account_employee (account_employee_id,employee_id,password) values(?,?,?) ",
                [account_employee_id,employee_id,password]);
            return { status: 200, message: "Emmployee add successfully!" };
            

            }else{
            return{status:404,message:"Exists employee !"}
            }
    }
    // lay full nhan vien [get]
    static async getEmployee(){
        const [Employee] = await db.query("select * from employee");
        if(Employee == 0){
            return {status:404 , message:"Doesn't have employee , add more employee please !"};
        }
        return {status : 200 , message : Employee }
    }
    // xoa nhan vien [del]
    static async RemoveEmployee(account_employee_id){
        try{
            const [Employee] = await db.query("select employee_id from account_employee where account_employee_id=?",[account_employee_id]);
            if(Employee.length == 0)    return {status:404 , message:"Not Found employee! "};
            await db.query("delete from employee where id=? ",
                [Employee[0].employee_id]
            )            
            return {status: 200 , message : "Delete Succesful !"};
            
        }catch(e){
            return {status:500,message:"Error "+e};
        }
    }

    // sua thon tien nhan vien [put]
    static async UpdateEmployee (first_name, last_name, email, address, phone,role,account_employee_id){
                
                const [result] = await db.query("SELECT employee_id FROM account_employee WHERE account_employee_id=?", [account_employee_id]);
    
                if (result.length === 0) {
                    return { status: 400, message: "employee not found!" };
                }
                const employee_id = result[0].employee_id;
                await db.query(
                    "UPDATE employee SET first_name=?, last_name=?,email=?, address=?, phone=? ,role=? WHERE id=?",
                    [first_name || null, last_name || null,email||null, address || null, phone || null,role , employee_id]
                );
            
                return { status: 200, message: "employee updated successfully!" };
    }

    //////////////////////////////////////// 
    // Quyen Cua Nhan Vien
    static async Form_visit(date,notes,customer_id,pet_id,employee_id,){

    }
   


}   

module.exports=AdminModel;

// {
//     "date":'2025-03-21',
//     "notes":'done',
//     "customer_id":2,
//     "pet_id":3,
//     "employee_id":2,
//     "services":["cham soc","tam","chua benh"]
// }