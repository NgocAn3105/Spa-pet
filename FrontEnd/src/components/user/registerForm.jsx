import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import helpers from '../../helpers/HandleCookies';
import axios from "axios";

// Class fetch data
class fetch {
    static async fetchEmployee() {
        try {
            const res = await axios.get("http://localhost:5000/Admin/employee-info");
            return res.data;
        } catch (error) {
            console.warn("Lỗi khi fetch employee:", error);
            return null;
        }
    }
}

export default function RegisterForm() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);
    const [fail, setFail] = useState(false);
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);  // 👉 Thêm state loading
    const [formData, setFormData] = useState({
        appointment_date: "",
        hours: "",
        employee_id: ""
    });

    // Load nhân viên bác sĩ khi vào form
    const getEmployee = async () => {
        const res = await fetch.fetchEmployee();
        if (res && res.employee && res.employee.message) {
            const doctors = res.employee.message.filter(item => item.role === "doctor");
            setEmployee(doctors);
        }
    };

    useEffect(() => {
        const token = helpers.getCookie("Token");
        setToken(token);
        if (!token) {
            setFail(true);
        } else {
            getEmployee();
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);  // 👉 Bắt đầu loading
        try {
            const res = await axios.post("http://localhost:5000/users/register_form", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            setMessage("Đặt Lịch Thành Công");
        } catch (error) {
            console.warn(error);
            setMessage("Có lỗi xảy ra khi đăng ký");
        } finally {
            setLoading(false);  // 👉 Kết thúc loading
            setTimeout(() => {
                setMessage('');
                closeModal();
            }, 2000);
        }
    };

    const closeModal = () => {
        navigate(-1);
    };

    const goToLogin = () => {
        navigate("/Login");
    };

    return (
        <div className="box-register">
            {message && <div className="success-message">{message}</div>}
            {fail ? (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Yêu cầu đăng nhập</h2>
                        <p>Bạn cần đăng nhập để tiếp tục sử dụng chức năng này.</p>
                        <button onClick={goToLogin} className="btn">Đăng Nhập</button>
                        <button onClick={closeModal} className="btn cancel">Đóng</button>
                    </div>
                </div>
            ) : (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Đăng Ký Dịch Vụ Cho Thú Cưng</h2>
                        <div className="form-register">
                            <input
                                type="date"
                                name="appointment_date"
                                value={formData.appointment_date}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="time"
                                name="hours"
                                value={formData.hours}
                                onChange={handleChange}
                                required
                            />
                            <select
                                name="employee_id"
                                value={formData.employee_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Chọn bác sĩ</option>
                                {employee.length > 0 ? (
                                    employee.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.first_name} {item.last_name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Không có dữ liệu bác sĩ</option>
                                )}
                            </select>

                            <button type="submit" className="btn" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Đang gửi..." : "Gửi Đăng Ký"}
                            </button>
                            <button type="button" onClick={closeModal} className="btn cancel">Đóng</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
