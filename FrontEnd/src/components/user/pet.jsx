import axios from "axios";
import { useEffect, useState } from "react";
import helpers from '../../helpers/HandleCookies';


class Api {
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

    static async addPet(token, petData) {
        try {
            const res = await axios.post("http://localhost:5000/users/add-pet", petData, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            return res.data;
        } catch (error) {
            console.error("Lỗi thêm thú cưng:", error);
            return null;
        }
    }
}

export default function PetInfo() {
    const [pets, setPets] = useState([]);
    const [token, setToken] = useState("");
    const [newPet, setNewPet] = useState({ name: "", breed: "", age: "" });
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const tokenValue = helpers.getCookie("Token");
        setToken(tokenValue);
        if (tokenValue) fetchPets(tokenValue);
    }, []);

    const fetchPets = async (tokenValue) => {
        const petRes = await Api.getPets(tokenValue);
        if (petRes) setPets(petRes.response.message);
    };

    const handleAddPet = async () => {
        const petData = { ...newPet };
        const res = await Api.addPet(token, petData);
        if (res) {
            setPets([...pets, res]);
            setIsFormVisible(false);
            setNewPet({ name: "", breed: "", age: "" });
        }

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPet({ ...newPet, [name]: value });
    };

    return (
        <div className="pet-info">
            <h2>Thông tin thú cưng của bạn</h2>

            {pets.length > 0 ? (
                <table className="pet-info-table">
                    <thead>
                        <tr>
                            <th>Tên Thú Cưng</th>
                            <th>Giống</th>
                            <th>Tuổi</th>

                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet, index) => (
                            <tr key={index}>
                                <td>{pet.name}</td>
                                <td>{pet.breed}</td>
                                <td>{pet.age} tuổi</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Chưa có thông tin thú cưng nào.</p>
            )}

            <button onClick={() => setIsFormVisible(true)} className="add-btn">
                Thêm Thú Cưng
            </button>

            {isFormVisible && (
                <div className="overlay">
                    <div className="add-pet-form">
                        <h3>Thêm Thú Cưng</h3>
                        <div>
                            <label>Tên Thú Cưng:</label>
                            <input
                                type="text"
                                name="name"
                                value={newPet.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Giống:</label>
                            <input
                                type="text"
                                name="breed"
                                value={newPet.breed}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Tuổi:</label>
                            <input
                                type="number"
                                name="age"
                                value={newPet.age}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button onClick={handleAddPet}>Lưu Thú Cưng</button>
                        <button onClick={() => setIsFormVisible(false)}>Hủy</button>
                    </div>
                </div>
            )}
        </div>
    );
}
