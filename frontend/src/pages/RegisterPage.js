import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarError, setAvatarError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleConfirmEmailChange = (event) => {
    setConfirmEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleAvatarChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 1024 * 1024) { // 1 MB limit
        setAvatarError('File size exceeds 1MB limit');
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        // Creăm o imagine pentru a redimensiona și comprima
        const img = new Image();
        img.src = reader.result;
  
        // Așteptăm încărcarea imaginii
        img.onload = function() {
          // Creăm un element canvas
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          // Redimensionăm canvas-ul conform noilor dimensiuni
          const maxWidth = 300; // Lățimea maximă dorită
          const maxHeight = 300; // Înălțimea maximă dorită
          let width = img.width;
          let height = img.height;
  
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
  
          // Desenăm imaginea redimensionată pe canvas
          ctx.drawImage(img, 0, 0, width, height);
  
          // Comprimăm imaginea
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // Calitatea compresiei între 0 și 1
  
          // Setăm imaginea comprimată ca avatar
          setAvatar(compressedDataUrl);
          setAvatarError('');
        };
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email !== confirmEmail) {
        setError('Emails do not match');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          firstName,
          lastName,
          role: 'MEMBER',
          phoneNumber,
          gender,
          address: {
            country,
            city,
            address,
            zipCode
          },
          avatarPhoto:avatar
        }),
      });

      if (response.ok) {
        console.log('Registration successful');
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen"style={{ marginTop: '60px' }}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ marginTop: '20px' }}>Register</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex justify-between mb-4">
            <div className="w-1/2 mr-2">
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="w-1/2 ml-2">
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={handleLastNameChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="avatar" className="block text-gray-700 text-sm font-bold mb-2 mr-2">Avatar</label>
            <div className='flex w-full justify-center'>
              <input
                type="file"
                id="avatar"
                onChange={handleAvatarChange}
                accept="image/*"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            {avatarError && <p className="text-red-500 mt-2">{avatarError}</p>}
          </div>
          <div className="flex justify-between mb-4">
            <div className="w-1/2 mr-2">
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
            <div className="w-1/2 ml-2">
              <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div className="w-1/2 mr-2">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="w-1/2 ml-2">
              <label htmlFor="confirmEmail" className="block text-gray-700 text-sm font-bold mb-2">Confirm Email</label>
              <input
                type="email"
                id="confirmEmail"
                value={confirmEmail}
                onChange={handleConfirmEmailChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div className="w-1/2 mr-2">
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
            <div className="w-1/2 ml-2">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={handleGenderChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex justify-between mb-4">
            <div className="w-full">
              <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">Country</label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={handleCountryChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div className="w-1/2 mr-2">
              <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={handleCityChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="w-1/2 ml-2">
              <label htmlFor="zipCode" className="block text-gray-700 text-sm font-bold mb-2">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                value={zipCode}
                onChange={handleZipCodeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
            <textarea
              id="address"
              value={address}
              onChange={handleAddressChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Register</button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <p className="text-gray-600 mt-4 text-sm" style={{ marginBottom: '20px' }}>Already have an account? <Link to="/login" className="text-indigo-500 hover:underline">Login</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
