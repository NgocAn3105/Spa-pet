import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
export default function ListService() {
    const [services, setServices] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchServices = async () => {
        try {
            const res = await axios.get("http://localhost:5000/Admin/Employee/info-services");
            setServices(res.data.services.message);
        } catch (error) {
            setError("Không thể lấy dữ liệu.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchServices();
    }, []);
    const handleClicked = async (serID) => {
        try {
            const res = await axios.post("http://localhost:5000/Admin/delete-services", { id: serID });
            alert(res.data.response.message);
            fetchServices();
        } catch (error) {
            setError("error" + error);
        }

    }

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container-list-ser">
            <h2>Danh sách dịch vụ</h2>
            <div className="service-list">
                {services.map((item, index) => (
                    <div key={index} className="service-card" >

                        <p><strong>Tên:</strong> {item.name}</p>
                        <p><strong>Giá:</strong> {item.price} VNĐ</p>
                        <p><strong>Mô tả:</strong> {item.description}</p>
                        <p className='btn_xoa' onClick={() => handleClicked(item.id)}>
                            <Button>Xóa</Button>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
