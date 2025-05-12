import axios from "axios";
import { useEffect, useState } from "react";
import helpers from '../../helpers/HandleCookies';


// API fetch class
class Api {
    static async getHistory(token) {
        try {
            const res = await axios.get("http://localhost:5000/users/History/customer-pet", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            return res.data;
        } catch (error) {
            console.error("Lỗi lấy lịch sử:", error);
            return null;
        }
    }

    static async getPets(token) {
        try {
            const res = await axios.get("http://localhost:5000/users/info-pet", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            return res.data;
        } catch (error) {
            console.error("Lỗi lấy thú cưng:", error);
            return null;
        }
    }
}

export default function History() {
    const [histories, setHistories] = useState([]);
    const [token, setToken] = useState("");
    const [petList, setPetList] = useState([]);
    const [selectedPet, setSelectedPet] = useState("");
    console.log(histories)

    useEffect(() => {
        const tokenValue = helpers.getCookie("Token");
        setToken(tokenValue);
        if (tokenValue) fetchData(tokenValue);
    }, []);

    const fetchData = async (tokenValue) => {
        const historyRes = await Api.getHistory(tokenValue);
        if (historyRes) setHistories(historyRes.pets.message);

        const petRes = await Api.getPets(tokenValue);
        if (petRes) setPetList(petRes.response.message);
    };

    const handlePetChange = (e) => {
        setSelectedPet(e.target.value);
    };

    return (
        <div className="history_pet-user">
            <h2>Lịch sử khám thú cưng</h2>

            {petList.length > 0 && (
                <select value={selectedPet} onChange={handlePetChange} className="pet-filter">
                    <option value="">-- Tất cả thú cưng --</option>
                    {petList.map((pet) => (
                        <option key={pet.id} value={pet.id}>{pet.name}</option>
                    ))}
                </select>
            )}

            {histories.length > 0 ? (
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Thú Cưng</th>
                            <th>Ngày Khám</th>
                            {histories.some(item => item.service) && <th>Dịch Vụ</th>} {/* Kiểm tra nếu có dịch vụ */}
                        </tr>
                    </thead>
                    <tbody>
                        {histories
                            .filter(item => selectedPet === "" || item.IdPet === Number(selectedPet))
                            .map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Pet}</td>
                                    <td>{new Date(item.date).toLocaleDateString('vi-VN')}</td>
                                    {item.service ? (
                                        <td>{item.service}</td>
                                    ) : (
                                        <td>Chưa sử dụng dịch vụ</td>
                                    )}
                                </tr>
                            ))}
                    </tbody>
                </table>
            ) : (
                <p>Chưa có lịch sử khám nào.</p>
            )}
        </div>
    );
}
