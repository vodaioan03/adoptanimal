import React from 'react';

const DogCard = ({ dog }) => {
  const { idNumber, givenName, breed, birthdayDate, age, createdTime, image } = dog;
  const handleAdopt = () => {
    console.log(`Adoptă câinele cu id-ul ${idNumber}`);
  };

  return (
    <div className="dog-card">
      <img src={image} alt={givenName} className="dog-image" />

      <div className="dog-info">
        <h2 className="dog-name">{givenName}</h2>
        <p className="dog-details">Breed: {breed}</p>
        <p className="dog-details">Age: {age}</p>
        <p className="dog-details">Birthday Date: {birthdayDate}</p>
        <p className="dog-details">Added From: {createdTime}</p>
        <button onClick={handleAdopt} className="adopt-button">Adopt</button>
      </div>
    </div>
  );
};

export default DogCard;
