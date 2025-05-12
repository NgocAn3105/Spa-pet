import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import helpers from '../../helpers/HandleCookies';
import axios from "axios";

export default function Profile() {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        phone: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewImg, setPreviewImg] = useState('');
    const [userID, setUserID] = useState(null);

    const token = helpers.getCookie("Token");

    const fetchUser = async () => {
        try {
            const res = await axios.get("http://localhost:5000/users/info-users", {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = res.data.user.message;
            setUser(data);
            setUserID(data.id);
            setFormData({
                first_name: data.first_name,
                last_name: data.last_name,
                address: data.address,
                phone: data.phone
            });
            setPreviewImg(`http://localhost:5000/Admin/getImg/${data.image}`);
        } catch (error) {
            console.warn("Lỗi: " + error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            setPreviewImg(URL.createObjectURL(file));
        }
    }

    const uploadImage = async () => {
        if (imageFile) {
            try {
                const imgData = new FormData();
                imgData.append("image", imageFile);
                imgData.append("customer_id", userID);
                await axios.post("http://localhost:5000/Admin/employee/upload", imgData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert("Upload ảnh thành công!");
                fetchUser();
            } catch (error) {
                console.error("Lỗi upload ảnh: ", error);
            }
        } else {
            alert("Bạn chưa chọn ảnh!");
        }
    }

    const handleSave = async () => {
        try {
            await axios.put("http://localhost:5000/users/update-user", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            alert("Cập nhật thông tin thành công!");
            fetchUser();
        } catch (error) {
            console.error("Lỗi cập nhật: ", error);
        }
    }

    return (
        <div className="container">
            <div className="profile">
                <div className="back_btn">
                    <Link to="/"><i class="bi bi-arrow-left"></i></Link>
                </div>

                <div className="head">
                    <div className="form_img">
                        <img src={previewImg} alt="avatar" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            id="upload-img"
                        />
                        <div className="btn_flex">

                            <label htmlFor="upload-img">Chọn ảnh</label>
                            <button className="btnUpload" onClick={uploadImage}>Lưu ảnh</button>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="form_row">
                        <div className="form_group">
                            <label>Họ:</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label>Tên:</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="form_group">
                        <label>Địa chỉ:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form_group">
                        <label>Số điện thoại:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form_group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={user.email}
                            disabled
                        />
                    </div>

                    <div className="button_row">

                        <button className="save_btn" onClick={handleSave}>Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
