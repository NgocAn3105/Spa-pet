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
                from: '"Spa Pet" <croissantzd16@gmail.com>', // Địa chỉ người gửi
                to: email, // Địa chỉ người nhận
                subject: "Xác Nhận Đăng Ký Lịch Khám tại Spa Pet", // Tiêu đề email
                text: "Xin chào, đây là email xác nhận đăng ký lịch khám tại Spa Pet!", // Nội dung dạng text
                html: `
                    <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f7f7f7;
                                    color: #333;
                                    margin: 0;
                                    padding: 0;
                                }
                                .email-container {
                                    width: 100%;
                                    padding: 20px;
                                    background-color: #ffffff;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                                    max-width: 600px;
                                    margin: 0 auto;
                                }
                                .email-header {
                                    background-color: #f0c14b;
                                    padding: 10px;
                                    text-align: center;
                                    border-radius: 8px 8px 0 0;
                                }
                                .email-header h1 {
                                    margin: 0;
                                    color: #fff;
                                }
                                .email-body {
                                    padding: 20px;
                                    text-align: center;
                                }
                                .email-footer {
                                    font-size: 12px;
                                    color: #888;
                                    text-align: center;
                                    margin-top: 20px;
                                }
                                .button {
                                    background-color: #28a745;
                                    color: white;
                                    padding: 10px 20px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 16px;
                                    margin-top: 20px;
                                    display: inline-block;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="email-container">
                                <div class="email-header">
                                    <h1>Chào Mừng Đến Với Spa Pet</h1>
                                </div>
                                <div class="email-body">
                                    <p><b>Xin chào!</b></p>
                                    <p>Cảm ơn bạn đã đăng ký lịch khám tại Spa Pet. Dưới đây là thông tin lịch khám của bạn:</p>
                                    <p><i>Thông tin chi tiết sẽ được điền ở đây nếu cần</i></p>
                                    <a href="http://example.com/confirm" class="button">Xác Nhận Lịch Khám</a>
                                </div>
                                <div class="email-footer">
                                    <p>Cảm ơn bạn đã tin tưởng chúng tôi!</p>
                                    <p><b>Spa Pet</b><br />123 Địa chỉ, HCM, Việt Nam</p>
                                </div>
                            </div>
                        </body>
                    </html>
                `,
            });
            console.log("Email đã được gửi thành công:", info.messageId);
        } catch (error) {
            console.error("Lỗi khi gửi email:", error);
        }

    }
}

module.exports = new MailService();
