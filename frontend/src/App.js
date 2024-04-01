import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './Home'; // sau orice altă pagină principală din aplicația ta
import Navbar from './navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar className="navbar-fixed" />
      <div className="fixlayout">
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;