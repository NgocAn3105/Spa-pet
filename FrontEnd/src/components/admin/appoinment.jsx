import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';

const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

export default function AppointmentList() {
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [appointmentDate, setAppointmentDate] = useState(getTodayDate());
    const [loading, setLoading] = useState(false);

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        return date.toLocaleDateString('vi-VN');
    };

    const fetchAppointment = async (date) => {
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/Admin/info-register-form", {
                appointment_date: date
            });
            const data = res.data?.register_form?.message;
            if (Array.isArray(data)) {
                setAppointments(data);
            } else {
                setAppointments([]);
                console.warn("Không tìm thấy dữ liệu lịch khám.");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu lịch khám:", error);
            setAppointments([]);
            setErrorMessage('Không thể lấy dữ liệu lịch khám');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointment(appointmentDate);
    }, [appointmentDate]);

    const handleClickDone = async (id) => {
        try {
            setLoading(true);
            var res = await axios.post("http://localhost:5000/Admin/info-register-form/update", {
                appointment_id: id
            });
            setMessage('Thêm thành công');
            fetchAppointment(appointmentDate);
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu:", error.response?.data || error.message);
            setMessage('Có lỗi xảy ra, vui lòng thử lại.');
        } finally {
            setLoading(false);
            setTimeout(() => {
                setMessage('');
                setErrorMessage('');
            }, 3000);
        }
    };

    return (
        <div className="appointment-list">
            {message && <div className="success-message">{message}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <h2>Danh sách lịch khám</h2>

            <div className="date-picker">
                <label>Chọn ngày:&nbsp;</label>
                <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                />
            </div>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <table className="appointment-table">
                    <thead>
                        <tr>
                            <th>Ngày</th>
                            <th>Giờ</th>
                            <th>Khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Tên Bác sĩ</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((item, index) => (
                                <tr key={index}>
                                    <td>{formatDate(item.date)}</td>
                                    <td>{item.hours}</td>
                                    <td>{item.NameCustomer}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.doctor}</td>
                                    <td>
                                        {item.status !== 'done' ? (
                                            <Button
                                                className="btn_done"
                                                onClick={() => handleClickDone(item.id)}
                                                disabled={loading}
                                            >
                                                Hoàn Thành
                                            </Button>
                                        ) : (
                                            item.status
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Chưa có lịch khám cho ngày này.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
