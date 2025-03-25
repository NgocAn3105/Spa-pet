const nodemailer = require("nodemailer");

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "croissantzd16@gmail.com",  // Thay bằng email của bạn
                pass: "xwrgqygatzjmbygh",       // Thay bằng App Password
            },
        });
    }

    async sendMail(email) {
        try {
            const info = await this.transporter.sendMail({
                from: '"Spa pet" <croissantzd16@gmail.com>',
                to: email,
                subject: "Xác Nhận Đăng Ký Lịch Khám",
                text: "Xin chào, đây là email test!",
                html: "<b>Xin chào, đây là email test!</b>",
            });

            console.log("Email đã gửi: " + info.messageId);
        } catch (error) {
            console.error("Lỗi gửi email:", error);
        }
    }
}

module.exports=new MailService();
