import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';

export default function HistoryPet() {
    const [phone, setPhone] = useState('');
    const [histories, setHistories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        return date.toLocaleDateString('vi-VN');
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        // Cắt "23:58:27.000000" → "23:58"
        return timeString.substring(0, 5);
    };

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/Admin/history-pets/Customer-phone", {
                phone: phone
            });
            const data = res.data.history.message;

            const grouped = [];
            data.forEach(item => {
                const key = `${item.Customer}-${item.IdPet}-${item.Pet}-${item.date}-${item.time}`;
                const exist = grouped.find(g => g.key === key);

                if (exist) {
                    if (item.service) exist.services.push(item.service);
                } else {
                    grouped.push({
                        key: key,
                        Customer: item.Customer,
                        IdPet: item.IdPet,
                        Pet: item.Pet,
                        date: formatDate(item.date),
                        time: formatTime(item.time),
                        services: item.service ? [item.service] : []
                    });
                }
            });

            setHistories(grouped);
        } catch (error) {
            console.error("Lỗi khi lấy lịch sử khám:", error);
            if (error.response) {
                console.log("Dữ liệu lỗi trả về từ server:", error.response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="history-container">
            <h2>Lịch Sử Khám Thú Cưng</h2>

            <div className="input-group">
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại khách hàng"
                />
                <Button onClick={fetchHistory}>Tìm</Button>
            </div>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : message ? (
                <p>{message}</p>
            ) : (
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Khách Hàng</th>
                            <th>ID Pet</th>
                            <th>Tên Pet</th>
                            <th>Ngày Khám</th>
                            <th>Giờ Khám</th>
                            <th>Dịch Vụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {histories.length > 0 ? (
                            histories.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Customer}</td>
                                    <td>{item.IdPet}</td>
                                    <td>{item.Pet}</td>
                                    <td>{item.date}</td>
                                    <td>{item.time}</td>
                                    <td>
                                        {item.services.length > 0
                                            ? item.services.join(', ')
                                            : 'Không có dịch vụ'}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Chưa có dữ liệu.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
