import React from 'react';
import { ReactComponent as InstagramLogo } from './svgs/instagram-icon.svg'; // Importarea logo-ului Instagram ca un SVG
import { ReactComponent as FacebookLogo } from './svgs/facebook-icon.svg'; // Importarea logo-ului Facebook ca un SVG
import { Link } from 'react-router-dom';
import dogFooter from './images/dog-footer.png'; // Importați imaginea locală

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: '#333', color: '#fff', padding: '2rem', position: 'relative' }}>
      <div className="footer-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="footer-left" style={{ textAlign: 'center', marginRight: 'auto' }}>
          <img src={dogFooter} alt="Address" style={{ width: '75px', height: 'auto', margin: '0 auto' }} /> {/* Centrare imagine */}
          <p>Cluj-Napoca, Romania</p>
          <div className="social-icons" style={{ display: 'flex', justifyContent: 'center' }}>
            <a href="https://www.instagram.com/yourshelter" target="_blank" rel="noopener noreferrer" style={{ marginRight: '1rem' }}>
              <InstagramLogo style={{ width: '25px', height: '25px', fill: '#fff' }} />
            </a>
            <a href="https://www.facebook.com/yourshelter" target="_blank" rel="noopener noreferrer">
              <FacebookLogo style={{ width: '25px', height: '25px', fill: '#fff' }} />
            </a>
          </div>
        </div>
        <div className="footer-right" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="footer-buttons" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ marginRight: '1rem' }}>
              <Link to="/contact" className="button" style={{ fontSize: '1.2rem' }}>Contact</Link>
            </div>
            <div>
              <Link to="/" className="button" style={{ fontSize: '1.2rem' }}>Home</Link>
            </div>
          </div>
        </div>
      </div>
      <p style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>&copy; 2024 Voda Ioan</p>
    </footer>
  );
};

export default Footer;
