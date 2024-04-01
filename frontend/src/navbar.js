// Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
        <div className="flex items-center">
          <Link to="/login" className="ml-6 lg:bg-white lg:text-gray-800 lg:px-4 lg:py-2 lg:rounded-full lg:hover:bg-gray-200 hidden lg:block" style={{ marginBottom: "0.5rem" }}>Login/Register</Link>
        </div>
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
          <li>
            <Link to="/login" className="block w-full bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-gray-200" style={{ marginBottom: "0.5rem" }}>Login/Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
