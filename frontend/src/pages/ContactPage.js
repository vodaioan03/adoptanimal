import React, { useState } from 'react';
//import Cookies from 'js-cookie';

const ContactPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Message submitted:', { firstName, lastName, email, phoneNumber, message });
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setMessage('');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="max-w-lg mx-auto mt-10">
          <div className="mb-4 text-center">
            <p className="text-3xl font-bold text-gray-800 mb-4">Contact</p>
          </div>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-4 flex justify-between">
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
            <div className="mb-4 flex justify-between">
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
                <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={handleMessageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-600">Send Message</button>
          </form>
          <p className="text-gray-700 mb-4">
            If you have any questions or inquiries, please feel free to contact us using the information below.
          </p>
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6m13 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-2 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z" />
            </svg>
            <p className="text-gray-800">Cluj-Napoca, Romania</p>
          </div>
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6m13 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-2 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z" />
            </svg>
            <p className="text-gray-800">vodaioan03@gmail.com</p>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6m13 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-2 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z" />
            </svg>
            <p className="text-gray-800">+40 741 433 574</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
