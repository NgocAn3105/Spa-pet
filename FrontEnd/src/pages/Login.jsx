import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [color, setColor] = useState("green");
    const handleForm = async () => {
        try {
            const res = await axios.post("http://localhost:5000/users/login", { email: email, password: pass }, { withCredentials: true });
            const data = res.data.response;
            if (data.user.status === 200) {
                // Lấy token từ response
                const token = data.token;
                setMessage("Đăng Nhập Thành Công");
                setColor("green");
                // Lưu token vào cookie
                document.cookie = `Token=${token}; path=/; `;
                setTimeout(() => {
                    setMessage('');
                    navigate('/');
                }, 1000);
            } else {
                setColor("red");
                setMessage(data.user.message);
                setTimeout(() => {
                    setMessage('');

                }, 2000);
            }
        } catch (error) {
            console.warn("error" + error);
        }
    }

    const ColorMessage = {
        backgroundColor: color
    };

    return (
        <div className="login-container">
            {message && <div className="success-message " style={ColorMessage}>{message}</div>}
            <div className="tab-content">
                {/* Login Tab */}
                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <h1 className="login-title">Đăng Nhập</h1> {/* Thêm thẻ h1 ở đây */}

                    <div className="form-outline mb-4">
                        <input type="email" id="loginName" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                        <label className="form-label" htmlFor="loginName">Email </label>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="password" id="loginPassword" className="form-control" onChange={(e) => setPass(e.target.value)} />
                        <label className="form-label" htmlFor="loginPassword">Password</label>
                    </div>

                    <div className="remember-forgot">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="loginCheck" />
                            <label className="form-check-label" htmlFor="loginCheck">Remember me</label>
                        </div>

                        <a href="#!">Forgot password?</a>
                    </div>

                    <button className="btn btn-primary btn-block mb-4" onClick={handleForm}>Đăng Nhập</button>

                    <div className="register-link">
                        <p>Not a member? <Link to="/register">Register</Link></p>
                    </div>

                </div>
            </div>
        </div >
    );
}
