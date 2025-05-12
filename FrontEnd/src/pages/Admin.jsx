import React, { useState } from 'react';
import AddService from '../components/admin/Addservice';
import ListService from '../components/admin/ListService';
import ListEmployee from '../components/admin/ListEmployee';
import AppointmentList from '../components/admin/appoinment';
import HistoryCustomer from '../components/admin/HistoryCustomer';
import AddVisit from '../components/admin/AddVisit';
import axios from 'axios';

export default function Admin() {
    const [selected, setSelected] = useState({ content: 'Trang thông tin', num: 0 });
    const [login, setLogin] = useState(false); // Trạng thái đăng nhập
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleClick = (content, num) => {
        setSelected({ content, num });
    };

    const renderContent = () => {
        switch (selected.num) {
            case 1: return <AddService />;
            case 2: return <ListService />;
            case 3: return <ListEmployee />;
            case 4: return <AppointmentList />;
            case 5: return <HistoryCustomer />;
            case 6: return <AddVisit />;
            default: return <div>{selected.content}</div>;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/Admin/employee/employee-login", {
                account_employee_id: email,
                password: password
            });

            if (res.data.employee.status) {
                setLogin(true); // Đăng nhập thành công
                setError('');
            } else {
                setError("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.");
            }
        } catch (error) {
            setError("Có lỗi xảy ra. Vui lòng thử lại.");
            console.log("Lỗi đăng nhập: ", error);
        }
    };

    return (
        <div>
            {!login ? (
                // Nếu chưa đăng nhập, hiển thị form đăng nhập
                <div className="login-form">
                    <h2>Đăng Nhập</h2>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label>number:</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="error">{error}</div>}
                        <button type="submit">Đăng Nhập</button>
                    </form>
                </div>
            ) : (
                // Nếu đã đăng nhập, hiển thị dashboard quản trị
                <div className="container-dashboard">
                    <div className="item">
                        <h4>Dashboard</h4>

                        <div className="service">
                            <div className="service-container">
                                <p>SERVICE</p>
                                <ul>
                                    <li className="ser-item item-dash" onClick={() => handleClick("Thêm Dịch Vụ", 1)}>
                                        <i className="bi bi-box-seam-fill"></i>
                                        <span> Thêm Dịch Vụ</span>
                                        <i className="bi bi-chevron-compact-right"></i>
                                    </li>
                                    <li className="ser-item item-dash" onClick={() => handleClick("Xem Dịch Vụ", 2)}>
                                        <i className="bi bi-backpack-fill"></i>
                                        <span>Xem Dịch Vụ</span>
                                        <i className="bi bi-chevron-compact-right"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="employee">
                            <div className="employee-container">
                                <p>Employee</p>
                                <ul>
                                    <li className="em-item item-dash" onClick={() => handleClick("Quản Lý Nhân Viên", 3)}>
                                        <i className="bi bi-gear"></i>
                                        <span> Quản Lý Nhân Viên</span>
                                        <i className="bi bi-chevron-compact-right"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="customer">
                            <div className="customer-container">
                                <p>Customer</p>
                                <ul>
                                    <li className="cus-item item-dash" onClick={() => handleClick("Lịch Khám Bệnh", 4)}>
                                        <i className="bi bi-calendar"></i>
                                        <span>Lịch Khám Bệnh</span>
                                        <i className="bi bi-chevron-compact-right"></i>
                                    </li>
                                    <li className="cus-item item-dash" onClick={() => handleClick("Lịch sử khám người dùng", 5)}>
                                        <i className="bi bi-calendar-date"></i>
                                        <span> Lịch sử khám người dùng</span>
                                        <i className="bi bi-chevron-compact-right"></i>
                                    </li>
                                    <li className="cus-item item-dash" onClick={() => handleClick("Tạo Hóa Đơn Khám", 6)}>
                                        <i className="bi bi-calendar-plus"></i>
                                        <span> Tạo Hóa Đơn Khám</span>
                                        <i className="bi bi-chevron-compact-right"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <div className="container_info">
                            <div className="item-info">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
