import axios from 'axios';
import { useEffect, useState } from 'react';
import banner from '../assets/img/Clnical-Banner-scaled.webp'
export default function HomePage() {
    const [service, setService] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeColumn, setActiveColumn] = useState(null);

    const handleClick = (colIndex) => {
        setActiveColumn(colIndex === activeColumn ? null : colIndex);
    };

    useEffect(() => {
        const fetchService = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:5000/Admin/employee/info-services");
                setService(res.data.services.message);

            } catch (error) {
                setLoading(false);
                setError("Have error " + error);
            }
        }

        fetchService();
    }, [])




    return (
        <div className='main '>
            <div className="head">
                <div className="head_img">
                    <img src={banner} alt="Clinic Banner" />
                    <div className="overlay">
                        <h1>Các dịch vụ lâm sàng</h1>
                        <p>Thú cưng của bạn xứng đáng nhận được sự chăm sóc tốt nhất. <br />
                            Đó là những gì thú cưng của bạn sẽ nhận được tại ADI.</p>
                    </div>
                </div>
            </div>
            <div className="main_content container">
                <h1>Tất cả đều dành cho thú cưng của bạn</h1>
                <div className="content_columns">
                    <div className="column">
                        <p>Thú cưng của bạn không thể nói. Chúng không thể nói rằng chúng bị bệnh hoặc không ổn ở đâu. Điều đó khiến bạn trở thành tuyến phòng thủ đầu tiên của chúng. Chúng trông cậy vào bạn, những người thân của chúng, để nhận thấy các vấn đề rồi đưa chúng đến bác sĩ thú y. Bạn hiểu về người bạn của mình và bác sĩ của chúng tôi có kỹ năng chuyên môn, chúng ta có thể làm việc cùng nhau để chẩn đoán thú cưng của bạn và quyết định phương pháp điều trị tốt nhất.</p>
                        <p>Đó cũng là lý do tại sao chúng ta phải có các công cụ để chẩn đoán chính xác các vấn đề sức khỏe không thể nhìn thấy ở bên ngoài. Sau đó, chúng tôi có thể sử dụng tất cả các kỹ năng của mình để giải thích các chuẩn đoán và chúng ta có thể tìm ra các phương pháp điều trị hiệu quả.</p>
                    </div>
                    <div className="column">
                        <p>Nếu không được đào tạo tốt nhất và có công cụ tốt nhất, chúng tôi không thể chăm sóc cho thú cưng của bạn một cách tốt nhất. Đó là lý do tại sao chúng tôi đã đầu tư vào các bác sĩ thú y và thiết bị tốt nhất, đồng thời tạo ra một số cơ sở y tế dành cho động vật tốt nhất trong khu vực.</p>
                        <p>Các bác sĩ thú y của chúng tôi có trình độ chuyên môn cao với nhiều năm kinh nghiệm chẩn đoán và điều trị cho thú cưng gặp các vấn đề sức khỏe phức tạp. Và chúng tôi tin rằng dịch vụ chăm sóc y tế tốt nhất cho thú cưng của bạn đến từ việc chúng ta làm việc cùng nhau theo cách hòa nhập, hợp tác và thoải mái cho bạn và thú cưng của bạn nhất có thể.</p>
                    </div>
                </div>
            </div>
            <div className="mid_content">
                Vật nuôi của chúng ta không chỉ là động vật; chúng là thành viên của gia đình.

                Đó là lý do tại sao chúng tôi cung cấp dịch vụ chăm sóc thú y chữa lành về cả thể xác lẫn tâm hồn cho các bé.
            </div>

            <div className="main_Services container">
                <h1>Các dịch vụ được xây dựng dựa trên nhu cầu của thú cưng</h1>
                <div className="column_services">
                    {
                        service.length > 0 &&
                        [...Array(Math.ceil(service.length / 3))].map((_, colIndex) => (
                            <div className="list_service" key={colIndex}>
                                {
                                    service.slice(colIndex * 3, colIndex * 3 + 3).map((item, index) => (
                                        <div className="service_box" key={index}>
                                            <p>{item.name}</p>
                                            <span className="icon">
                                                <i className="bi bi-plus-lg"></i>
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>

    );
}
