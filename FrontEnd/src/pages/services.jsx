import React from 'react';
import imga from '../assets/img/1.jpg';
import imga1 from '../assets/img/2.jpg';
import imga2 from '../assets/img/3.jpg';
import imga3 from '../assets/img/4.jpg';
import imga4 from '../assets/img/5.jpg';
import imga5 from '../assets/img/6.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';



export default function Services() {
    const navigate = useNavigate();

    const handleRegis = () => {
        return navigate('/register-form')
    }
    return (
        <div className="services_content">
            <div className="main_service">
                <div className="head">
                    <div className="box">
                        <div className="img">
                            <img src={imga} alt="Dịch vụ" />
                        </div>
                        <div className="text">
                            <h1>Dịch vụ</h1>
                            <p>Có một người bạn đồng hành là một niềm vui, và một trách nhiệm quan trọng. Là người có trách nhiệm, bạn muốn thú cưng của mình nhận được tất cả sự chăm sóc và yêu thương mà chúng cần để sống lâu và hạnh phúc. Đó là lý do tại sao sự lựa chọn bác sĩ thú y của bạn là rất quan trọng.</p>
                            <br />
                            <p>Bạn muốn có một bác sĩ thú y tận tụy để giữ cho thú cưng của bạn khỏe mạnh và hạnh phúc. Một bác sĩ thú y làm việc với bạn không mệt mỏi để đảm bảo sức khỏe toàn diện cho thú cưng của bạn. Và bạn muốn bác sĩ thú y đó làm tốt công việc của mình nhất có thể. Điều đó có nghĩa là họ phải có cơ sở vật chất, công cụ chẩn đoán hạng nhất và các loại thuốc phù hợp.</p>
                            <br />
                            <p>Và khi thú cưng của bạn không khỏe, bạn muốn bác sĩ thú y tất cả những điều họ có thể giúp chúng đứng vững trở lại. Chúng tôi cung cấp tất cả những điều đó và còn hơn thế nữa tại Animal Doctors International.</p>
                            <button className="appointments" onClick={handleRegis}>Đặt Hẹn</button>
                        </div>
                    </div>
                </div>
                <div className="content_service">
                    <div className="text">
                        <h1>Các dịch vụ</h1>
                        <p>Từ chăm sóc sức khỏe đến làm đẹp, chúng tôi có tất cả!</p>
                    </div>
                    <div className="box_services">
                        <div className="box">
                            <img src={imga1} alt="" />
                            <div className="text">
                                <h3>Sức khỏe lâm sàng</h3>
                                <p>Các phương pháp điều trị và phòng ngừa được thiết kế riêng cho từng bệnh nhân bởi các bác sĩ chuyên môn quốc tế.</p>
                            </div>
                            <div className="icon">
                                <i class="bi bi-arrow-right"></i>
                            </div>
                        </div>
                        <div className="box">
                            <img src={imga2} alt="" />
                            <div className="text">
                                <h3>Phẫu thuật</h3>
                                <p>Cơ sở vật chất và bác sĩ phẫu thuật đẳng cấp thế giới mang đến cho thú cưng của bạn cơ hội tốt nhất để hồi phục hoàn toàn.</p>
                            </div>
                            <div className="icon">
                                <i class="bi bi-arrow-right"></i>
                            </div>
                        </div>
                        <div className="box">
                            <img src={imga3} alt="" />
                            <div className="text">
                                <h3>Trị liệu toàn diện</h3>
                                <p>Chăm sóc, trị liệu toàn diện cho sức khỏe và phục hồi toàn diện cho thú cưng của bạn.</p>
                            </div>
                            <div className="icon">
                                <i class="bi bi-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about_service">
                    <div className="text">
                        <h1>Triết lý của ADI</h1>
                        <p>Chúng tôi muốn bạn và thú cưng của bạn cảm thấy mình là một thành viên quý giá trong gia đình chúng tôi. Điều đó có nghĩa là chúng tôi ở đây để chăm sóc cho cả hai. Các bệnh viện của ADI không chỉ được trang bị công nghệ, dụng cụ và thuốc nhập khẩu mới nhất. Nó còn được thiết kế để chào đón và thư giãn cho thú cưng — và cho bạn. Từ nơi đón khách đến các phòng điều trị, bạn sẽ luôn nở nụ cười và dễ dàng giao tiếp khi các chuyên gia của chúng tôi hướng dẫn bạn từng bước. Tất cả mọi người từ bác sĩ thú y đẳng cấp thế giới đến nhân viên hỗ trợ của chúng tôi đều được đào tạo chuyên sâu để giúp việc sử dụng dịch vụ của chúng tôi trở thành trải nghiệm tốt nhất có thể cho những bệnh nhân bốn chân và gia đình yêu thương của họ.</p>
                        <button>Bảng Giá</button>
                    </div>
                    <div className="img">
                        <img src={imga4} alt="" />
                    </div>
                </div>
                <div className="last_service" style={{ backgroundImage: `url(${imga5})` }}>
                    <h1>Compassionate care, right when it matters</h1>
                    <button className="appointments">Đặt Hẹn</button>
                </div>



            </div>
        </div>
    );
}
