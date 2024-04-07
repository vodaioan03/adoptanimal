import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProfilePage = ({ user, setUser }) => {
  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email);
  const [editingPassword, setEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState(user.phoneNumber);
  const [editingFirstName, setEditingFirstName] = useState(false);
  const [newFirstName, setNewFirstName] = useState(user.firstName);
  const [editingLastName, setEditingLastName] = useState(false);
  const [newLastName, setNewLastName] = useState(user.lastName);
  const navigate = useNavigate();

  const handleEmailChange = async() => {

    try {
      const jwtToken = Cookies.get('jwtToken');
      if (!jwtToken) {
        return;
      }
      console.log(user);
      const response = await fetch(`http://localhost:8080/user/changeEmail/${user.username}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: newEmail
      });
  
      if (response.ok) {
        const userData = await response.json();
        setUser(userData); 
        localStorage.setItem('user', JSON.stringify(userData));
        setEditingEmail(false);
      } 
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
    }
  };

  const handlePasswordChange = async() => {
    console.log('Password changed to:', newPassword);
    setEditingPassword(false);
  };

  const handlePhoneNumberChange = async() => {

    try {
      const jwtToken = Cookies.get('jwtToken');
      if (!jwtToken) {
        return;
      }
  
      const response = await fetch(`http://localhost:8080/user/changeNumber/${user.username}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: newPhoneNumber
      });
  
      if (response.ok) {
        const userData = await response.json();
        setUser(userData); 
        localStorage.setItem('user', JSON.stringify(userData));
        setEditingPhoneNumber(false);
      } 
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
    }
  };

  const handleFirstNameChange = async() => {
    console.log('First Name changed to:', newFirstName);
    setEditingFirstName(false);
  };

  const handleLastNameChange = async() => {
    console.log('Last Name changed to:', newLastName);
    setEditingLastName(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    Cookies.remove('jwtToken');
    navigate('/');
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-col items-center mb-4">
            <img src={user.avatarPhoto} alt="Avatar" className="w-20 h-20 rounded-full mb-2" />
            <span className="text-gray-700 text-sm font-bold">{user.username}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="mb-4">
              <div className="text-gray-700 text-sm font-bold mb-2">Email:</div>
              {editingEmail ? (
                <div className="flex">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="mr-2 border border-gray-400 px-2 py-1 rounded"
                  />
                  <button onClick={handleEmailChange} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Save</button>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>{user.email}</span>
                  <button onClick={() => setEditingEmail(true)} className="ml-2 text-sm text-blue-500 hover:underline">Change</button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="text-gray-700 text-sm font-bold mb-2">Phone Number:</div>
              {editingPhoneNumber ? (
                <div className="flex">
                  <input
                    type="text"
                    value={newPhoneNumber}
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                    className="mr-2 border border-gray-400 px-2 py-1 rounded"
                  />
                  <button onClick={handlePhoneNumberChange} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Save</button>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>{user.phoneNumber}</span>
                  <button onClick={() => setEditingPhoneNumber(true)} className="ml-2 text-sm text-blue-500 hover:underline">Change</button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="text-gray-700 text-sm font-bold mb-2">First Name:</div>
              {editingFirstName ? (
                <div className="flex">
                  <input
                    type="text"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    className="mr-2 border border-gray-400 px-2 py-1 rounded"
                  />
                  <button onClick={handleFirstNameChange} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Save</button>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>{user.firstName}</span>
                  <button onClick={() => setEditingFirstName(true)} className="ml-2 text-sm text-blue-500 hover:underline">Change</button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="text-gray-700 text-sm font-bold mb-2">Last Name:</div>
              {editingLastName ? (
                <div className="flex">
                  <input
                    type="text"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    className="mr-2 border border-gray-400 px-2 py-1 rounded"
                  />
                  <button onClick={handleLastNameChange} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Save</button>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>{user.lastName}</span>
                  <button onClick={() => setEditingLastName(true)} className="ml-2 text-sm text-blue-500 hover:underline">Change</button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="text-gray-700 text-sm font-bold mb-2">Gender:</div>
              <span>{user.gender}</span>
            </div>
            <div className="mb-4">
              <div className="text-gray-700 text-sm font-bold mb-2">Creation Date:</div>
              <span>{user.createdTime}</span>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
          </div>
          <div className="mt-4">
            {editingPassword ? (
              <div className="flex">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mr-2 border border-gray-400 px-2 py-1 rounded"
                />
                <button onClick={handlePasswordChange} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Save</button>
              </div>
            ) : (
              <button onClick={() => setEditingPassword(true)} className="text-sm text-blue-500 hover:underline">Change Password</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
