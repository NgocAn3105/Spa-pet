import React, { useState } from 'react';

function App() {
    const [message, setMessage] = useState('');

    const handleClick = () => {
        // Khi nhấn nút, hiển thị thông báo
        setMessage('Thanh toán thành công!');

        // Ẩn thông báo sau 3 giây
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div>
            <button onClick={handleClick}>Hiển thị thông báo</button>

            {message && <div className="success-message">{message}</div>}
        </div>
    );
}

export default App;
