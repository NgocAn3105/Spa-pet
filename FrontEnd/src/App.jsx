
import './App.scss';
import './styles/main.scss';
import './styles/Admin.scss';
import './styles/pages.scss';
import './styles/user.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import Admin from './pages/Admin.jsx';
import Header from './components/headers.jsx';
import Footer from './components/footer.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/register.jsx';
import Profile from './components/user/profile.jsx';
import Pet from './components/user/pet.jsx';
import ScrollToTop from './helpers/ScrolltoTop.jsx';
import Services from './pages/services.jsx';
import RegisterForm from './components/user/registerForm.jsx';
import HistoryUser from './components/user/history.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pet" element={<Pet />} />
          <Route path="/service" element={<Services />} />
          <Route path="/register-form" element={<RegisterForm />} />
          <Route path="/history" element={<HistoryUser />} />

        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
