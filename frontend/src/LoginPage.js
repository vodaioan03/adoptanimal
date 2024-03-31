import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Utilizatorul s-a autentificat cu succes
        console.log('Login successful');
        // Redirecționați către o altă pagină sau faceți alte acțiuni aici
        navigate.push('/home'); // Exemplu de redirecționare către pagina de dashboard
      } else {
        // Autentificare eșuată
        console.error('Login failed');
        setError('Invalid username or password.'); // Setarea mesajului de eroare pentru afișare
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred. Please try again later.'); // Setarea mesajului de eroare pentru afișare
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen">
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
        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>} {/* Afișarea mesajului de eroare, dacă există */}
        <p className="text-gray-600 mt-4 text-sm">Don't have an account? <Link to="/register" className="text-indigo-500 hover:underline">Register</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
