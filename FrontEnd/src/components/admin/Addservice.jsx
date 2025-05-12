import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddService() {
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/Admin/add-service', {
                name: serviceName,
                price,
                description: price, // Assuming description is also price in this case
            });

            setMessage('Dịch vụ đã được thêm thành công!');
            setServiceName('');
            setPrice('');
            setDescription('');

            // Ẩn thông báo sau 3 giây
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (error) {
            setMessage('Có lỗi xảy ra, vui lòng thử lại!');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    };

    return (
        <div className="add-service-container">
            <h3>Thêm Dịch Vụ Mới</h3>
            <form onSubmit={handleSubmit} className="add-service-form">
                <div className="form-group">
                    <label htmlFor="serviceName">Tên Dịch Vụ:</label>
                    <input
                        type="text"
                        id="serviceName"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Giá:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Ghi chú:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Thêm</button>
            </form>

            {message && (
                <div className="success-message">
                    {message}
                </div>
            )}
        </div>
    );
}
