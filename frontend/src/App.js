import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/Home'; 
import Navbar from './pages/navbar';
import Footer from './pages/Footer';
import './App.css';
import DogList from './pages/Doglist';


function App() {
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const calculateContentHeight = () => {
      const navbarElement = document.querySelector('.navbar-fixed');
      if (navbarElement) {
        const navbarHeight = navbarElement.offsetHeight;
        const windowHeight = window.innerHeight;
        const newContentHeight = windowHeight - navbarHeight;
        setContentHeight(newContentHeight);
      }
    };

    calculateContentHeight();
    window.addEventListener('resize', calculateContentHeight);

    return () => {
      window.removeEventListener('resize', calculateContentHeight);
    };
  }, []);

  return (
    <Router>
      <Navbar className="navbar-fixed" />
      <div className="fixlayout" style={{ minHeight: contentHeight }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dogs" element={<DogList />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;