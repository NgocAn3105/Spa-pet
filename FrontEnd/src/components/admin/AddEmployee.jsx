import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
export default function AddEmployee({ onBack, onSuccess }) {
    const [accountEmployeeId, setAccountEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const handleAddEmployee = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/Admin/employee-add', {
                account_employee_id: accountEmployeeId,
                password: password
            });
            console.log(response.data);
            setMessage('Thêm nhân viên thành công!');
            setAccountEmployeeId('');
            setPassword('');

        } catch (error) {
            console.error(error);
            setMessage('Có lỗi xảy ra khi thêm nhân viên.');
        } finally {
            setLoading(false);

            setTimeout(() => {
                setMessage('');
                if (onSuccess) onSuccess();
            }, 2000);
        }
    };

    return (
        <div className="add_employee_frm">
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid"
                                alt="Sample"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-outline mb-4">
                                    <label htmlFor="form3Example3" className="form-label">Email nhân viên</label>
                                    <input
                                        type="email"
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Nhập email hợp lệ"
                                        value={accountEmployeeId}
                                        onChange={(e) => setAccountEmployeeId(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-outline mb-3">
                                    <label htmlFor="form3Example4" className="form-label">Mật khẩu</label>
                                    <input
                                        type="password"
                                        id="form3Example4"
                                        className="form-control form-control-lg"
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <Button
                                        type="button"
                                        className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                        onClick={handleAddEmployee}
                                    >
                                        Thêm
                                    </Button>

                                    <Button
                                        type="button"
                                        className="btn btn-secondary btn-lg ms-3"
                                        onClick={onBack}
                                    >
                                        Quay lại
                                    </Button>
                                </div>

                                {message && <div className="success-message">{message}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
