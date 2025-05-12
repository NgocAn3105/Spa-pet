import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';

export default function Employeeid({ employeeId, setEmployeeId }) {
    const [employeeDetail, setEmployeeDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [message, setMessage] = useState('');

    const fetchEmployeeById = async (id) => {
        try {
            const res = await axios.post("http://localhost:5000/Admin/employee-info-id", {
                employee_id: id
            });
            setEmployeeDetail(res.data.employee.message[0]);
            setLoading(false);
        } catch (err) {
            setError("Không thể lấy dữ liệu chi tiết nhân viên.");
            setLoading(false);
            console.error(err);
        }
    };

    useEffect(() => {
        if (employeeId !== null) {
            fetchEmployeeById(employeeId);
        }
    }, [employeeId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleUpdate = async () => {
        try {
            let imageName = employeeDetail.img;

            if (selectedImage) {
                const formData = new FormData();
                formData.append("image", selectedImage);
                const imgRes = await axios.post("http://localhost:5000/Admin/upload-img", formData);
                imageName = imgRes.data.img_path;
            }

            await axios.put("http://localhost:5000/Admin/employee-update", {
                employee_id: employeeId,
                first_name: employeeDetail.first_name,
                last_name: employeeDetail.last_name,
                email: employeeDetail.email,
                address: employeeDetail.address,
                phone: employeeDetail.phone,
                role: employeeDetail.role,
                img: imageName
            });

            setMessage("✅ Cập nhật nhân viên thành công!");

            fetchEmployeeById(employeeId);
        } catch (err) {
            console.error(err);
            setMessage('❌ Có lỗi xảy ra, vui lòng thử lại!');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;

    const fieldLabels = {
        first_name: 'Tên',
        last_name: 'Họ',
        email: 'Email',
        address: 'Địa chỉ',
        phone: 'Số điện thoại',
        role: 'Chức vụ'
    };

    return (
        <div className="employee-detail">
            {message && <div className="message">{message}</div>}

            <h2 className="title">Thông tin nhân viên</h2>

            {employeeDetail && (
                <div className="card">
                    <div className="avatar-section">
                        <img
                            src={
                                previewImage
                                    ? previewImage
                                    : employeeDetail.img
                                        ? `http://localhost:5000/Admin/getImg/${employeeDetail.img}`
                                        : "/images.jpg"
                            }
                            alt="avatar"
                            className="avatar"
                        />
                        <input type="file" onChange={handleImageChange} />
                    </div>

                    <div className="form-section">
                        {Object.keys(fieldLabels).map((field) => (
                            <div className="form-group" key={field}>
                                <label>{fieldLabels[field]}</label>
                                <input
                                    type="text"
                                    value={employeeDetail[field]}
                                    onChange={(e) =>
                                        setEmployeeDetail({ ...employeeDetail, [field]: e.target.value })
                                    }
                                />
                            </div>
                        ))}

                        <div className="button-group">
                            <Button onClick={handleUpdate}>💾 Cập nhật</Button>
                            <Button onClick={() => setEmployeeId(null)} className="back-btn">🔙 Quay lại</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
