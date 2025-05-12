import React from 'react';

const Footer = () => {
    return (
        <footer className="pet-footer">
            <div className="footer-container">
                <div className="footer-about">
                    <h3>PetCare Spa</h3>
                    <p>
                        Chăm sóc thú cưng tận tình, yêu thương như chính gia đình bạn. Dịch vụ spa, khám bệnh và chăm sóc sức khỏe toàn diện cho các bé cưng.
                    </p>
                </div>
                <div className="footer-contact">
                    <h4>Liên hệ</h4>
                    <p><i className="bi bi-telephone-fill"></i>  0123 456 789</p>
                    <p><i className="bi bi-envelope-fill"></i>  petcare@gmail.com</p>
                    <p><i className="bi bi-geo-alt-fill"></i>  123 Phố Pet, Quận Thú, TP.HCM</p>
                </div>
                <div className="footer-social">
                    <h4>Kết nối</h4>
                    <div className="social-icons">
                        <a href="#"><i className="bi bi-facebook"></i></a>
                        <a href="#"><i className="bi bi-instagram"></i></a>
                        <a href="#"><i className="bi bi-twitter-x"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 PetCare Spa. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
