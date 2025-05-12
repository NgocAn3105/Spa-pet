import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login() {
    const { pathname } = useLocation();

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleForm = async () => {
        try {
            const res = await axios.post("http://localhost:5000/users/signin", { email: email, password: pass });
            setMessage("Đăng Ký Thành Công");
            setTimeout(() => {
                setMessage('');
                if (res.data.user.status == 200) navigate('/login')
            }, 1000)

        } catch (error) {
            console.warn("error" + error);
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])
    return (
        <div className="login-container">
            {message && <div className="success-message">{message}</div>}
            <div className="tab-content">
                {/* Login Tab */}
                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <h1 className="login-title">Đăng Ký</h1> {/* Thêm thẻ h1 ở đây */}

                    <div className="form-outline mb-4">
                        <input type="email" id="loginName" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
                        <label className="form-label" htmlFor="loginName">Email </label>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="password" id="loginPassword" className="form-control" onChange={(e) => setPass(e.target.value)} />
                        <label className="form-label" htmlFor="loginPassword">Password</label>
                    </div>

                    <button className="btn btn-primary btn-block mb-4" onClick={handleForm}>Đăng Ký</button>

                    <div className="register-link">
                        <p>Have a member? <Link to="/login">Đăng Nhập</Link></p>
                    </div>

                </div>
            </div>
        </div>
    );
}
