import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setMenuOpen(false); 
    Cookies.remove('jwtToken');
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white py-4 h-16">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div>
          <Link to="/" className="text-2xl font-bold" style={{ fontFamily: 'Font Name', textTransform: 'uppercase' }}>Dog Shelter</Link>
        </div>
        <div className="hidden lg:flex lg:justify-center">
          <ul className="flex space-x-6">
            <li><a href="/" className="nav-link">HOME</a></li>
            <li><a href="/dogs" className="nav-link">DOGS</a></li>
            <li><a href="/contact" className="nav-link">CONTACT</a></li>
          </ul>
        </div>
        {user ? (
          <div className="relative flex items-center">
            <div className="relative" ref={menuRef}>
              <button onClick={toggleMenu} className="flex items-center">
                <img src={user.avatarPhoto} alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
                <span className="mr-2">{user.username}</span>
                <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M10 20a2.5 2.5 0 002.5-2.5v-5A2.5 2.5 0 0010 10h-.08a5.482 5.482 0 01-4.84 0H5.5A2.5 2.5 0 003 12.5v5A2.5 2.5 0 005.5 20h9zm4.5-2.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-7 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm4-8a4 4 0 014 4H6a4 4 0 014-4zm2.5-4.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
                </svg>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <ul>
                    <li><Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link></li>
                    <li><button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <Link to="/login" className="ml-6 lg:bg-white lg:text-gray-800 lg:px-4 lg:py-2 lg:rounded-full lg:hover:bg-gray-200 hidden lg:block" style={{ marginBottom: "0.5rem" }}>Login/Register</Link>
          </div>
        )}
        <div className="flex lg:hidden">
          <button onClick={toggleMenu} className="block text-white hover:text-gray-300 focus:text-gray-300 focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {menuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/>
              ) : (
                <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/>
              )}
            </svg>
          </button>
        </div>
      </div>
      <div className={`lg:hidden ${menuOpen ? 'block' : 'hidden'}`} style={{ paddingBottom: "1rem" }}>
        <ul className="flex flex-col items-center mt-4 bg-gray-800">
          <li className="mb-2"><Link to="/" className="text-white hover:text-gray-300" style={{ textTransform: 'uppercase' }}>Home</Link></li>
          <li className="mb-2"><Link to="/dogs" className="text-white hover:text-gray-300" style={{ textTransform: 'uppercase' }}>Dogs</Link></li>
          <li className="mb-2"><Link to="/contact" className="text-white hover:text-gray-300" style={{ textTransform: 'uppercase' }}>Contact</Link></li>
          {!user && (
            <li>
              <Link to="/login" className="block w-full bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-gray-200" style={{ marginBottom: "0.5rem" }}>Login/Register</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
