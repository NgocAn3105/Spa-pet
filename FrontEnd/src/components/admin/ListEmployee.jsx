import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import Employeeid from './EmployeeUpdate';
import AddEmployee from './AddEmployee';
export default function ListEmployee() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [employeeId, setEmployeeId] = useState(null);
    const [btnDel, setbtnDel] = useState({ message: '', id: null });
    const [message, setMessage] = useState('');
    const [box, setbox] = useState('');
    // Lấy danh sách nhân viên khi component mount
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/Admin/employee-info");
            setEmployees(res.data.employee.message);
        } catch (err) {
            setError("Không thể lấy dữ liệu nhân viên.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const DeleteEmployee = async (id) => {
        setLoading(true);
        try {
            var res = await axios.delete("http://localhost:5000/Admin/employee-remove", {
                data: { employee_id: id }
            });
            await setMessage("Xóa Thành Công");

        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.employee?.message || 'Có lỗi xảy ra, vui lòng thử lại!';
            setMessage(errorMsg);
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } finally {
            setLoading(false);
            await fetchEmployees();
            setTimeout(() => {
                setMessage('');

            }, 2000);
        }
    }
    const handleDelete = () => {
        DeleteEmployee(btnDel.id);
        setbtnDel({ message: '', id: null });

    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleClickBtnDel = (id, name) => {
        setbtnDel({ message: `Bạn thật sự có muốn xóa ${name}`, id });
    };

    const handleClickBtn = (id) => {
        setEmployeeId(id);
    };
    const handleClickBtnBack = () => {
        setbtnDel({ message: "", id: null })
    }

    const handleReload = () => {
        fetchEmployees();
    };
    const handleAddEmployee = () => {
        setbox(<AddEmployee onBack={() => setbox('')} onSuccess={fetchEmployees} />)
    }

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container-list-ser">
            <div className="box_add">
                {box}
            </div>
            {message && <div className="success-message">{message}</div>}

            {employeeId === null ? (
                <>
                    <div className="btn-employee btn-head">
                        <Button onClick={handleReload}>Reload</Button> {/* Nút reload */}
                        <Button onClick={handleAddEmployee}>Add</Button> {/* Nút reload */}

                    </div>

                    <h2>Danh sách nhân viên</h2>

                    <div className="employee-list">
                        {btnDel.message && (
                            <div className="del_message">
                                <p>{btnDel.message}</p>
                                <div className="btn-employee btn-head">
                                    <Button onClick={handleDelete}>Okay</Button>
                                    <Button onClick={handleClickBtnBack}>Quay Lai</Button>

                                </div>
                            </div>
                        )}
                        {employees
                            .filter(item => item.role != 'quit')
                            .map((item, index) => (
                                <div key={index} className="employee-card">
                                    <div className="employee-image">
                                        {item.img ? (
                                            <img
                                                src={`http://localhost:5000/Admin/getImg/${item.img}`}
                                                alt="avatar"
                                                className="employee-img"
                                            />
                                        ) : (
                                            <img
                                                src={"/images.jpg"}
                                                alt="avatar"
                                                className="employee-img"
                                            />
                                        )}
                                    </div>
                                    <div className="employee-info">
                                        <p><strong>Id:</strong> {item.id}</p>
                                        <p><strong>Tên:</strong> {item.first_name} {item.last_name}</p>
                                        <p><strong>Email:</strong> {item.email}</p>
                                        <p><strong>Phone:</strong> {item.phone}</p>
                                        <p><strong>Role:</strong> {item.role}</p>
                                    </div>
                                    <div className="btn_employee">
                                        <p className='btn-update'>
                                            <Button onClick={() => handleClickBtn(item.id)}>Update</Button>
                                        </p>
                                        <p className='btn-delete'>
                                            <Button onClick={() => handleClickBtnDel(item.id, item.first_name + " " + item.last_name)}>Delete</Button>
                                        </p>
                                    </div>
                                </div>
                            ))}

                    </div >
                </>
            ) : (
                <Employeeid
                    employeeId={employeeId}
                    setEmployeeId={(id) => {
                        setEmployeeId(id);
                        if (id === null) fetchEmployees();
                    }}
                />
            )
            }
        </div >
    );
}
