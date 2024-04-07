import React, { useState, useEffect } from 'react';
import '../css/dog.css';
import DogCard from './DogCard';
import Cookies from 'js-cookie';

const DogList = () => {
  console.log('Component rendered');
  const [dogs, setDogs] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('jwtToken');
        
        const response = await fetch('http://localhost:8080/api/getAnimals', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.log('Not ok');
          throw new Error('Failed to fetch dogs');
        }
        
        const data = await response.json();
        setDogs(data);
      } catch (error) {
        console.error('Error fetching dogs:', error);
        setError('An unexpected error occurred. Please try again later.');
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 mt-10">
        <div className="mb-4 text-center mt-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Available Dogs</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dogs.map((dog, index) => (
            <DogCard key={index} dog={dog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DogList;
