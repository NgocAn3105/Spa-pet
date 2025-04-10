const helpersModel = require('../model/helpersModel');
class helpersControllers {

    //  phan Admin hoac Employee co the xem
    async info_resgister_form(req, res) {
        const { appointment_date } = req.body;
        if (!appointment_date) return res.json({ status: 400, message: "Missing require!" });
        const register_form = await helpersModel.Info_register_form(appointment_date);
        return res.json({ register_form });
    }


    async History_customer_pet_byphone(req, res) {
        const { phone } = req.body;
        if (!phone) return res.json({ status: 400, message: "Missing Require!" });
        const history = await helpersModel.History_Customer_pet_byPhone(phone);
        return res.json({ history })
    }
    // phan danh cho khach hang co the xem cung

}


module.exports = new helpersControllers;