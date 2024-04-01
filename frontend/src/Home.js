import React from 'react';
import './Home.css';
import './main.css'
import dog1 from './images/dog1.jpg';
import dog2 from './images/dog2.jpg';
import dog3 from './images/dog3.jpg';

const HomePage = () => {
  return (
    <div className="bg-gray-100 h-screen" >
      <div className="bg-dog-background bg-cover bg-center h-screen relative">
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        <div className="container mx-auto py-8 px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">About Our Shelter</h2>
          <p className="text-gray-300 text-lg mb-12">Welcome to Dog Shelter, where we provide a safe and caring environment for dogs in need. Our mission is to find loving homes for every dog that comes into our care.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden shadow-md bg-white">
              <img src={dog1} alt="Dog 1" className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Meet Our Dogs</h3>
                <p className="text-gray-700">Discover the dogs currently available for adoption at our shelter.</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md bg-white">
              <img src={dog2} alt="Dog 2" className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Donate to Support Us</h3>
                <p className="text-gray-700">Help us continue our mission by making a donation to our shelter.</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md bg-white">
              <img src={dog3} alt="Dog 3" className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Volunteer with Us</h3>
                <p className="text-gray-700">Join our team of dedicated volunteers and make a difference in the lives of dogs in need.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
