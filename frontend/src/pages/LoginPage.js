import "../css/main.css"
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginPage = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginPageHeight, setLoginPageHeight] = useState(`${window.innerHeight}px`);
  const navigate = useNavigate();

  useEffect(() => {
    const updateLoginPageHeight = () => {
      const navbarHeight = document.querySelector('.navbar-fixed')?.offsetHeight || 0;
      const newLoginPageHeight = `calc(100vh - ${navbarHeight}px)`;
      setLoginPageHeight(newLoginPageHeight);
    };

    updateLoginPageHeight();

    window.addEventListener('resize', updateLoginPageHeight);
    window.addEventListener('load', updateLoginPageHeight); 

    return () => {
      window.removeEventListener('resize', updateLoginPageHeight);
      window.removeEventListener('load', updateLoginPageHeight);
    };
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const getUser = async (setUser) => {
    try {
      const jwtToken = Cookies.get('jwtToken');
      if (!jwtToken) {
        setUser(null); 
        return;
      }
  
      const response = await fetch(`http://localhost:8080/user/getUser/${username}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
      });
  
      if (response.ok) {
        const userData = await response.json();
        setUser(userData); 
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setUser(null); 
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/auth/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Authentication failed');
      }
      return response.json();
    })
    .then(data => {
      Cookies.remove('jwtToken');
      Cookies.set('jwtToken', data.jwt, { expires: 1 });
      getUser(setUser);
      navigate('/'); 
    })
    .catch(error => {
      console.error('Error during authentication:', error);
      setError('An unexpected error occurred. Please try again later.');
    });
  };

  return (
    <div className="bg-gray-100" style={{ height: loginPageHeight }}>
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Login</button>
        </form>
        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>} {}
        <p className="text-gray-600 mt-4 text-sm">Don't have an account? <Link to="/register" className="text-indigo-500 hover:underline">Register</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
