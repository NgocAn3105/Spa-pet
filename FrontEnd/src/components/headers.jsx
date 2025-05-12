import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import helpers from '../helpers/HandleCookies'

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    // Hàm lấy cookie theo tên

    const handleLogout = () => {
        // Xóa cookie token bằng cách đặt lại với maxAge=0
        document.cookie = "Token=; max-age=0; path=/";
        setIsLoggedIn(false);
        setShowMenu(false);
        navigate("/login");
    };

    useEffect(() => {
        // Kiểm tra cookie token
        const token = helpers.getCookie("Token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, [location]);

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light nav_header">
                <a className="navbar-brand" href="/">Spa Pet</a>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/">Trang Chủ</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/service">Dịch Vụ</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register-form">Đặt Lịch</Link>
                        </li>
                    </ul>

                    {/* Phần đăng ký / đăng nhập */}
                    <ul className="navbar-nav ms-auto">
                        {!isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/register">Đăng ký</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login">Đăng nhập</Link>
                                </li>
                            </>
                        ) : (
                            <li className={`nav-item ${showMenu ? "show-menu" : ""}`}>
                                <i
                                    className="bi bi-person-circle"
                                    style={{ fontSize: '24px' }}
                                    onClick={() => setShowMenu(!showMenu)}
                                ></i>
                                <div className="user-menu">
                                    <Link to="/profile">Hồ sơ</Link>
                                    <Link to="/pet">Thú Cưng</Link>
                                    <Link to="/history">Lịch sử khám</Link>
                                    <button className="logout" onClick={handleLogout}>Đăng xuất</button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
