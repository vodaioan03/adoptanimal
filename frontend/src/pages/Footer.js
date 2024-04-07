import React from 'react';
import { ReactComponent as InstagramLogo } from '../images/svgs/instagram-icon.svg'; 
import { ReactComponent as FacebookLogo } from '../images/svgs/facebook-icon.svg'; 
import { Link } from 'react-router-dom';
import dogFooter from '../images/dog-footer.png'; 

const Footer = () => {
  return (
    <footer className="footer bg-gray-800" style={{ color: '#fff', padding: '2rem', position: 'relative' }}>
      <div className="footer-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <div className="footer-logo" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <img src={dogFooter} alt="Address" style={{ width: '100px', height: 'auto' }} /> 
          <p style={{ margin: '0', fontSize: '0.8rem' }}>Cluj-Napoca, Romania</p>
        </div>
        <div className="footer-buttons" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ marginRight: '1rem' }}>
            <Link to="/contact" className="button" style={{ fontSize: '1rem', color: '#fff', textDecoration: 'none', padding: '0.5rem 1rem', border: '2px solid #fff', borderRadius: '5px' }}>Contact</Link>
          </div>
          <div>
            <Link to="/" className="button" style={{ fontSize: '1rem', color: '#fff', textDecoration: 'none', padding: '0.5rem 1rem', border: '2px solid #fff', borderRadius: '5px' }}>Home</Link>
          </div>
        </div>
        <div className="social-icons" style={{ display: 'flex', justifyContent: 'center' }}>
          <a href="https://www.instagram.com/yourshelter" target="_blank" rel="noopener noreferrer" style={{ marginRight: '1rem' }}>
            <InstagramLogo style={{ width: '25px', height: '25px', fill: '#fff' }} />
          </a>
          <a href="https://www.facebook.com/yourshelter" target="_blank" rel="noopener noreferrer">
            <FacebookLogo style={{ width: '25px', height: '25px', fill: '#fff' }} />
          </a>
        </div>
      </div>
      <p style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.8rem' }}>&copy; 2024 Voda Ioan</p>
    </footer>
  );
};

export default Footer;
