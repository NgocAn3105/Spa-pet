const helpersModel = require('../model/helpersModel');
class helpersControllers {

    //  phan Admin hoac Employee co the xem
    async info_resgister_form(req, res) {
        const { appointment_date } = req.body;
        if (!appointment_date) return res.json({ status: 400, message: "Missing require!" });
        const register_form = await helpersModel.Info_register_form(appointment_date);
        return res.json({ register_form });
    }
    async info_resgister_form_update(req, res) {
        const { appointment_id } = req.body;
        if (!appointment_id) return res.json({ status: 400, message: "Missing require!" });
        const register_form = await helpersModel.Info_register_formUpdate(appointment_id);
        if (register_form.status == 200)
            return res.status(200).json({ register_form });
        else if (register_form.status == 404) return res.status(404).json({ register_form })
        else {
            return res.status(500).json({ register_form })
        }

    }


    async History_customer_pet_byphone(req, res) {
        const { phone } = req.body;
        if (!phone) return res.status(400).json({ message: "Missing Require!" });

        const history = await helpersModel.History_Customer_pet_byPhone(phone);

        if (history.status != 200) {
            return res.status(400).json({ history });
        } else {
            return res.status(200).json({ history });
        }
    }

    // phan danh cho khach hang co the xem cung
    async UploadImg(req, res) {
        const { customer_id } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'Chưa chọn ảnh!' });
        }
        const img_path = `${req.file.filename}`;
        const img = await helpersModel.uploadImg(img_path, customer_id);

        return res.json({ img, img_path });
    }


}


module.exports = new helpersControllers;